import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CampaignsService,
  SettingsService,
  OutcomesService,
  CommsService,
  LimitsService,
  MessageService, TenantStoreService
} from '@cl-core-services';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { MatDialog, MatStepper } from '@angular/material';
import {
  NewCampaignDonePopupComponent,
  NewCampaignDonePopupComponentData
} from '../new-campaign-done-popup/new-campaign-done-popup.component';
import { Router, ActivatedRoute } from '@angular/router';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { map, switchMap, catchError, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, of, Observable, Subject } from 'rxjs';

import {
  IWCampaignAttributes,
  IWCommTemplateAttributes,
  IWLimitAttributes,
  IWNotificationAttributes,
  IWProfileAttributes,
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IJsonApiItem
} from '@perx/whistler';
import { ICampaign, ICampaignOutcome } from '@cl-core/models/campaign/campaign';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { IComm } from '@cl-core/models/comm/schedule';
import { IOutcome } from '@cl-core/models/outcome/outcome';
import { CampaignChannelsFormService } from '../../services/campaign-channels-form.service';
import Utils from '@cl-helpers/utils';
import { CRUDParser, RequestType } from '@cl-helpers/crud-parser';
import { NotificationService } from '@cl-core/services/notification.service';
import { IChannel, ICampaignNotificationGroup } from '@cl-core/models/campaign/channel-interface';
import { Location } from '@angular/common';
import { NewCampaignNotificationsComponent } from '../new-campaign-notifications/new-campaign-notifications.component';
import {NewCampaignReviewPageComponent} from '../new-campaign-review-page/new-campaign-review-page.component';

@Component({
  selector: 'cl-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignComponent implements OnInit, OnDestroy {
  public channelForm: FormGroup;
  public form: FormGroup;
  private campaign: ICampaign;
  public tenantSettings: ITenantsProperties;
  @ViewChild('stepper', { static: false }) private stepper: MatStepper;
  @ViewChild(NewCampaignNotificationsComponent, { static: false }) private campaignNotification: NewCampaignNotificationsComponent;
  @ViewChild(NewCampaignReviewPageComponent, { static: false }) private campaignReview: NewCampaignReviewPageComponent;
  public currentNotifications: Partial<IChannel>;
  public campaignId: string;

  private destroy$: Subject<void> = new Subject();

  constructor(
    public store: CampaignCreationStoreService,
    private stepConditionService: StepConditionService,
    private campaignsService: CampaignsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private settingsService: SettingsService,
    private tenantStoreService: TenantStoreService,
    private commsService: CommsService,
    private outcomesService: OutcomesService,
    private limitsService: LimitsService,
    private audienceService: AudiencesUserService,
    private messageService: MessageService,
    private campaignChannelsFormService: CampaignChannelsFormService,
    private notificationService: NotificationService
  ) {
    store.resetCampaign();
    this.initForm();
  }

  public ngOnInit(): void {
    this.initTenantSettings();
    this.initForm();
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.store.updateCampaign(value);
      });
    this.handleCampaignNameChanges();
    this.handleRouteParams();
    this.initChannelForm();
  }

  public ngOnDestroy(): void {
    this.cdr.detach();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public sendTestSms(data: any): void {
    console.log('send sms', data);
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['Campaign Name', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)
      ]
      ]
    });
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public getStepCondition(key: number): boolean {
    return this.stepConditionService.getStepCondition(key);
  }

  public goBack(): void {
    this.stepper.previous();
  }

  public quit(): void {
    this.location.back();
  }

  public goNext(value?: MatStepper): void {
    const stepIndex = this.stepper.selectedIndex;
    if (
      (this.campaignNotification && this.campaignNotification.audience.get('select').invalid)
      && stepIndex === 3) {
      return this.campaignNotification.setMarkAsTouchedAudience();
    }

    if (this.channelForm.invalid) {
      this.channelForm.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }

    this.stepConditionService.nextEvent(stepIndex);
    this.store.updateCampaign(this.stepConditionService.getStepFormValue(stepIndex));
    if (stepIndex === 3) {
      this.handlerWebLinkNotification();
      this.addNotificationToStore();
    }
    if (!value) {
      this.stepper.next();
    }
  }

  public get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }

  // this.campaignReview.nullOutcome, from review component to avoid computing again, direct access
  public save(): void {
    let saveCampaign$: Observable<IJsonApiItemPayload<IWCampaignAttributes>>;
    this.store.updateCampaign(this.form.value);
    // find if special slot exists if present include outcome object
    // else pass in unmodified copy of current campaign
    // duplicate current campaign
    const copyCurrentCampaign = {...this.store.currentCampaign};
    const foundSlot = copyCurrentCampaign.outcomes.find((outcome => outcome.outcome.slotNumber === 0));
    // if existing slot 0 patch it.
    if (foundSlot) {
      foundSlot.outcome.probability = 100 - this.campaignReview.nullOutcome.outcome.probability;
    } else {
      copyCurrentCampaign.outcomes = copyCurrentCampaign.outcomes.concat(this.campaignReview.nullOutcome);
    }
    if (this.store.currentCampaign.id) {
      saveCampaign$ = this.campaignsService.updateCampaign(copyCurrentCampaign);
    } else {
      saveCampaign$ = this.campaignsService.createCampaign(copyCurrentCampaign);
    }

    saveCampaign$.pipe(
      // tap((res: IJsonApiItemPayload<IWCampaignAttributes>) => this.campaignBaseURL = `${this.campaignBaseURL}?cid=${res.data.id}`),
      map((res: IJsonApiItemPayload<IWCampaignAttributes>) => ({ ...copyCurrentCampaign, id: res.data.id } as ICampaign)),
      switchMap(
        (campaign: ICampaign) => {
          const data = [
            of(campaign),
            this.generateLimitData(campaign).pipe(catchError(() => of(null))),
            this.updateOutcomes(campaign).pipe(catchError(() => of(null))),
            of(this.handlerNotification(campaign)).pipe(catchError(() => of(null))),
          ];
          return combineLatest(...data);
        }
      ),
      takeUntil(this.destroy$)
    ).subscribe(
      ([campaign]) => {
        if (campaign) {
          this.openCampaignDoneDialog(campaign);
        }
      },
      (error: Error) => console.warn(error.message)
    );
  }

  private generateLimitData(campaign: ICampaign): Observable<IJsonApiItemPayload<IWLimitAttributes> | void> {
    if (!campaign.limits) {
      return of(void 0);
    }

    if (campaign.limits.id) {
      return this.updateLimit(campaign);
    }

    return this.createLimit(campaign);
  }

  private updateLimit(campaign: ICampaign): Observable<IJsonApiItemPayload<IWLimitAttributes> | void> {
    return this.limitsService.updateLimit(
      campaign.limits.id,
      campaign.limits,
      campaign.template.attributes_type,
      Number.parseInt(campaign.id, 10),
      campaign.template.id
    );
  }

  private createLimit(campaign: ICampaign): Observable<IJsonApiItemPayload<IWLimitAttributes> | void> {
    return this.limitsService.createLimit(
      campaign.limits,
      campaign.template.attributes_type,
      Number.parseInt(campaign.id, 10),
      campaign.template.id
    );
  }

  private updateOutcomes(campaign: ICampaign): Observable<any> {
    let updateOutcomesArr$ = [];
    const rewardsCollection = campaign.outcomes;
    const updateOutcomeList = this.updateOutcomeWhenEdit(campaign, rewardsCollection);
    updateOutcomesArr$ = [...updateOutcomesArr$, ...updateOutcomeList];

    if (updateOutcomesArr$.length <= 0) {
      return of([]);
    }
    return combineLatest(...updateOutcomesArr$);
  }

  private updateOutcomeWhenEdit(
    campaign: ICampaign,
    data: ICampaignOutcome[],
  ): Observable<any>[] {
    if (!data || data.length <= 0) {
      return [];
    }
    const slots = this.store.currentCampaign.template && this.store.currentCampaign.template.slots || [0];
    const updateOutcomesArr$ = [];
    const oldCampaignListToDelete = data
      .filter(outcomeData => !slots.includes(outcomeData.outcome.slotNumber) && outcomeData.outcome.slotNumber !== 0);
    const campaignList = data
      .filter(outcomeData => slots.includes(outcomeData.outcome.slotNumber) || outcomeData.outcome.slotNumber === 0 );
    const deletedOutcome$ = outcomeId => this.outcomesService.deleteOutcome(outcomeId);
    const updatedOutcome$ = outcomeData =>
      this.outcomesService.updateOutcome(
        outcomeData,
        campaign.id
      );
    const createdOutcome$ = outcomeData =>
      this.outcomesService.createOutcome(
        outcomeData,
        campaign.id
      );

    campaignList.forEach(outcomeData => {
      if (this.store.currentCampaign.id && outcomeData.outcome.id) {
        updateOutcomesArr$.push(updatedOutcome$(outcomeData));
      } else {
        updateOutcomesArr$.push(createdOutcome$(outcomeData));
      }
    });
    if (oldCampaignListToDelete && oldCampaignListToDelete.length >= 0) {
      oldCampaignListToDelete.forEach(oldReward => {
        if (oldReward.outcome.id) {
          updateOutcomesArr$.push(deletedOutcome$(oldReward.outcome.id));
        }
      });
    }
    return updateOutcomesArr$;
  }

  private getCampaignDoneDialogData(campaign: ICampaign): Observable<NewCampaignDonePopupComponentData> {
    const type = (
      'notification' in campaign &&
      'webNotification' in campaign.notification &&
      campaign.notification.webNotification.webLink
    ) ? 'weblink' : '';
    const title: string = 'Yay! You just created a campaign';
    if (type === 'weblink' && campaign.audience && campaign.audience.select) {
      return this.buildCampaignCsv(campaign)
        .pipe(
          map(csv => {
            // const b = new Blob([csv], { type: 'application/csv;charset=utf-8;' });
            //  const url = URL.createObjectURL(b);
            const url = `data:application/octet-stream;charset=utf-16le;base64,${btoa(csv)}`;

            return {
              title,
              subTitle: 'Download your individual links',
              url,
              type: 'download'
            };
          })
        );
    }
    if (type === 'weblink') {
      return this.getCognitoUrl()
        .pipe(map(url => ({
          title,
          subTitle: 'Copy the link and share your campaign.',
          url: `${url}?cid=${campaign.id}`,
          type
        })));
    }

    return of({
      title,
      type
    });
  }

  private openCampaignDoneDialog(campaign: ICampaign): void {
    this.getCampaignDoneDialogData(campaign)
      .pipe(
        switchMap((config) => this.dialog.open(NewCampaignDonePopupComponent,
          { data: config }).afterClosed())
      )
      .subscribe(() => this.router.navigate(['/campaigns']));
  }

  private buildCampaignCsv(campaign: ICampaign): Observable<string> {
    const getUsersPis: Observable<string[]> = this.audienceService
      .getAllPoolUser(campaign.audience.select)
      .pipe(
        map((users: IJsonApiItem<IWProfileAttributes>[]) => users.map(u => u.attributes.primary_identifier)),
        takeUntil(this.destroy$)
      );
    return combineLatest(getUsersPis, this.getCognitoUrl())
      .pipe(
        map(([pis, url]: [string[], string]) => {
          return pis.reduce(
            (p: string, v: string) => `${p}${v},${url}?cid=${campaign.id}&pi=${v},\n`,
            'identifier,urls,\n'
          );
        }),
        takeUntil(this.destroy$)
      );
  }

  private initTenantSettings(): void {
    this.tenantStoreService.tenant$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tenantSettings: ITenantsProperties) => {
        this.tenantSettings = tenantSettings;
        this.cdr.detectChanges();
      });
  }

  private outcomeToRewardCollection(outcomes: IOutcome[]): ICampaignOutcome[] {
    const collections: ICampaignOutcome[] = [];
    outcomes.forEach(outcome => collections.push({ outcome }));
    return collections;
  }

  private getCognitoUrl(): Observable<string> {
    const params = { 'page[number]': '1', 'page[size]': '1' };
    return this.settingsService.getCognitoEndpoints(params).pipe(
      tap((data: any[]) => {
        if (data.length === 0) {
          this.messageService.show(
            'Your account does not appear to be linked to a microsite, please contact your Customer Support',
            'warning',
            5000);
        }
      }),
      map((data: any[]) => (data.length > 0) ? data[0].url : ''),
      takeUntil(this.destroy$)
    );
  }

  private handleCampaignNameChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.store.updateCampaign(value);
      });
  }

  private handleRouteParams(): void {
    this.campaignId = this.route.snapshot.params.id;
    const paramsPO: HttpParamsOptions = {
      'filter[domain_id]': this.campaignId
    };
    if (this.campaignId) {

      this.initChannelData();

      combineLatest(
        this.campaignsService.getCampaign(this.campaignId).pipe(catchError(() => of(null))),
        this.outcomesService.getOutcomes(paramsPO).pipe(catchError(() => of(null)))
      ).pipe(
        map(
          ([campaign, outcomes]:
            [ICampaign | null, IOutcome[] | null]): ICampaign => {
            return ({
              ...campaign,
              outcomes: this.outcomeToRewardCollection(outcomes)
            });
          })
      ).subscribe(
        campaign => {
          this.campaign = Object.assign({}, campaign);
          this.store.initCampaign(campaign);
          this.form.patchValue({
            name: this.campaign.name
          });
          this.patchNotificationWebLink(this.campaign);
        },
        () => this.router.navigateByUrl('/campaigns')
      );
    }
  }

  private initChannelData(): void {
    this.notificationService.getNotifications(this.campaignId)
      .subscribe((result) => {
        this.campaignChannelsFormService.patchForm(this.channelForm, result);
        this.currentNotifications = this.channelForm.value;
      });
  }

  private initChannelForm(): void {
    this.channelForm = this.campaignChannelsFormService.getForm();
    this.currentNotifications = this.channelForm.value;
  }

  private patchNotificationWebLink(data: any): void {
    const notification = data['notification'];
    if (notification && notification.webNotification && notification.webNotification.webLink) {
      this.channelForm.get('webNotification')
        .patchValue({
          webLink: true,
          webLinkOptions: data.displayProperties.informationCollectionSetting
        });
    }
  }

  private addNotificationToStore(): void {
    this.store.updateCampaign({ notification: this.channelForm.value });
  }

  private handlerWebLinkNotification(): void {
    const notification = this.channelForm.value['webNotification'];
    if (this.campaign) {
      const webLink: ICampaign = {
        campaignInfo: {
          ...this.store.currentCampaign.campaignInfo,
        },
        notification: {
          ...this.store.currentCampaign.notification,
          webNotification: {
            webLink: !!notification.webLink,
            webLinkOptions: notification.webLinkOptions
          }
        }
      };

      if (!notification.webLink) {
        delete webLink.notification.webNotification.webLinkOptions;
        webLink.notification.webNotification['status'] = 'remove';
      }
      this.store.updateCampaign(webLink);
    }

  }

  private handlerNotification(campaign: ICampaign): void {

    const notifications: IChannel = this.channelForm.value;
    Object.keys(notifications)
      .forEach((key: string) => {
        const notification: ICampaignNotificationGroup[] = notifications[key];
        const defaultNotification: ICampaignNotificationGroup[] = this.currentNotifications[key];

        if (Utils.isArray(notification)) {
          const result = this.getNotificationRequests(defaultNotification, notification, campaign);
          combineLatest(result)
            .subscribe(() => { });
        }
      });
  }

  public createTemplate(data: IComm): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    return this.commsService.createCommsTemplate(data);
  }

  public updateTemplate(data: IComm): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    return this.commsService.updateCommsTemplate(data);
  }

  public manageNotification(
    data: ICampaignNotificationGroup,
    campaignId: string
  ): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.createTemplate(data.template)
      .pipe(
        switchMap((res: IJsonApiItemPayload<IWCommTemplateAttributes>) => {
          data['templateId'] = res.data.id;
          return this.createNotification(data, campaignId);
        }));
  }

  public createNotification(
    data: ICampaignNotificationGroup,
    campaignId: string
  ): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.notificationService.createNotification(data, campaignId);

  }

  public updateNotification(
    data: ICampaignNotificationGroup,
    campaignId: string
  ): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.updateTemplate(data.template)
      .pipe(
        switchMap(res => {
          data['templateId'] = res.data.id;
          return this.notificationService.updateNotification(data, campaignId);
        })
      );
  }

  public deleteNotification(id: string): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.notificationService.deleteNotification(id);
  }

  private getNotificationRequests(
    currentConditions: ICampaignNotificationGroup[],
    updatedConditions: ICampaignNotificationGroup[],
    campaign: ICampaign
  ): Observable<IJsonApiListPayload<IWNotificationAttributes>>[] {
    return CRUDParser.buildRequestList(currentConditions, updatedConditions, (type, data) => {
      switch (type) {
        case RequestType.CREATE:
          return this.manageNotification(data, campaign.id);
        case RequestType.UPDATE:
          return this.updateNotification(data, campaign.id);
        case RequestType.DELETE:
          return this.deleteNotification(data.id);
      }
    });
  }

}
