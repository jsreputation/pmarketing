import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CampaignsService, SettingsService, OutcomesService, CommsService, LimitsService, MessageService } from '@cl-core-services';
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
  IWProfileAttributes
} from '@perx/whistler';
import { ICampaign, ICampaignOutcome } from '@cl-core/models/campaign/campaign.interface';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { IComm } from '@cl-core/models/comm/schedule';
import { IOutcome } from '@cl-core/models/outcome/outcome';

@Component({
  selector: 'cl-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignComponent implements OnInit, OnDestroy {
  // private id: string;
  public form: FormGroup;
  private campaign: ICampaign;
  public tenantSettings: ITenantsProperties;
  @ViewChild('stepper', { static: false }) private stepper: MatStepper;

  private destroy$: Subject<void> = new Subject();

  constructor(
    public store: CampaignCreationStoreService,
    private stepConditionService: StepConditionService,
    private campaignsService: CampaignsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private settingsService: SettingsService,
    private commsService: CommsService,
    private outcomesService: OutcomesService,
    private limitsService: LimitsService,
    private audienceService: AudiencesUserService,
    private messageService: MessageService
  ) {
    store.resetCampaign();
    this.initForm();
  }

  public ngOnInit(): void {
    this.initTenantSettings();
    // this.initForm();
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.store.updateCampaign(value);
      });
    this.handleRouteParams();
  }

  public ngOnDestroy(): void {
    this.cdr.detach();
    this.destroy$.next();
    this.destroy$.complete();
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

  public goNext(value?: MatStepper): void {
    const stepIndex = this.stepper.selectedIndex;
    this.stepConditionService.nextEvent(stepIndex);
    this.store.updateCampaign(this.stepConditionService.getStepFormValue(stepIndex));
    if (!value) {
      this.stepper.next();
    }
  }

  public get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }

  public save(): void {
    let saveCampaign$: Observable<IJsonApiPayload<IWCampaignAttributes>>;
    this.store.updateCampaign(this.form.value);
    if (this.store.currentCampaign.id) {
      saveCampaign$ = this.campaignsService.updateCampaign(this.store.currentCampaign);
    } else {
      saveCampaign$ = this.campaignsService.createCampaign(this.store.currentCampaign);
    }

    saveCampaign$.pipe(
      // tap((res: IJsonApiPayload<IWCampaignAttributes>) => this.campaignBaseURL = `${this.campaignBaseURL}?cid=${res.data.id}`),
      map((res: IJsonApiPayload<IWCampaignAttributes>) => ({ ...this.store.currentCampaign, id: res.data.id } as ICampaign)),
      switchMap(
        (campaign: ICampaign) => combineLatest(
          of(campaign),
          this.generateLimitData(campaign).pipe(catchError(() => of(null))),
          this.updateOutcomes(campaign).pipe(catchError(() => of(null))),
          this.updateComm(campaign).pipe(catchError(() => of(null)))
        )
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

  private generateLimitData(campaign: ICampaign): Observable<IJsonApiPayload<IWLimitAttributes> | void> {
    if (!campaign.limits) {
      return of(void 0);
    }

    if (campaign.limits.id) {
      return this.updateLimit(campaign);
    }

    return this.createLimit(campaign);
  }

  private updateLimit(campaign: ICampaign): Observable<IJsonApiPayload<IWLimitAttributes> | void> {
    return this.limitsService.updateLimit(
      campaign.limits.id,
      campaign.limits,
      campaign.template.attributes_type,
      Number.parseInt(campaign.id, 10),
      campaign.template.id
    );
  }

  private createLimit(campaign: ICampaign): Observable<IJsonApiPayload<IWLimitAttributes> | void> {
    return this.limitsService.createLimit(
      campaign.limits,
      campaign.template.attributes_type,
      Number.parseInt(campaign.id, 10),
      campaign.template.id
    );
  }

  private updateComm(campaign: ICampaign): Observable<any> {
    let templateAction$;
    let eventAction$;
    const channelInfo = Object.assign({}, this.store.currentCampaign.channel);
    const updateCommsTemplate$ = this.commsService.updateCommsTemplate(channelInfo);
    const createCommsTemplate$ = this.commsService.createCommsTemplate(channelInfo);
    const updateCommsEvent$ = newTemplateId =>
      this.commsService.updateCommsEvent(this.store.currentCampaign, newTemplateId, campaign.id);
    const createCommsEvent$ = newTemplateId =>
      this.commsService.createCommsEvent(this.store.currentCampaign, newTemplateId, campaign.id);

    if (channelInfo.type === 'sms') {
      if (channelInfo.templateId) {
        templateAction$ = updateCommsTemplate$;
      } else {
        templateAction$ = createCommsTemplate$;
      }
      if (channelInfo.eventId) {
        eventAction$ = updateCommsEvent$;
      } else {
        eventAction$ = createCommsEvent$;
      }

      return templateAction$.pipe(
        switchMap((template: IJsonApiPayload<IWCommTemplateAttributes>) => eventAction$(template.data.id))
      );
    }
    if (channelInfo.eventId) {
      eventAction$ = updateCommsEvent$;
    } else {
      eventAction$ = createCommsEvent$;
    }

    return eventAction$(null);
  }

  private updateOutcomes(campaign: ICampaign): Observable<any> {
    let updateOutcomesArr$ = [];
    const rewardsCollection = this.store.currentCampaign.outcomes;
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
    const oldCampaignListToDelete = data.filter(outcomeData => !slots.includes(outcomeData.outcome.slotNumber));
    const campaignList = data.filter(outcomeData => slots.includes(outcomeData.outcome.slotNumber));
    const deleteOutcomes$ = outcomeId => this.outcomesService.deleteOutcome(outcomeId);
    const updateOutcomes$ = outcomeData =>
      this.outcomesService.updateOutcome(
        outcomeData,
        campaign.id
      );
    const createOutcomes$ = outcomeData =>
      this.outcomesService.createOutcome(
        outcomeData,
        campaign.id
      );

    campaignList.forEach(outcomeData => {
      if (this.store.currentCampaign.id && outcomeData.outcome.id) {
        updateOutcomesArr$.push(updateOutcomes$(outcomeData));
      } else {
        updateOutcomesArr$.push(createOutcomes$(outcomeData));
      }
    });
    if (oldCampaignListToDelete && oldCampaignListToDelete.length >= 0) {
      oldCampaignListToDelete.forEach(oldReward => {
        if (oldReward.outcome.id) {
          updateOutcomesArr$.push(deleteOutcomes$(oldReward.outcome.id));
        }
      });
    }
    return updateOutcomesArr$;
  }

  private getCampaignDoneDialogData(campaign: ICampaign): Observable<NewCampaignDonePopupComponentData> {
    const type = ('channel' in campaign && 'type' in campaign.channel) ? campaign.channel.type : '';
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
    this.settingsService.getTenant()
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

  private handleRouteParams(): void {
    const campaignId = this.route.snapshot.params.id;
    const paramsComm: HttpParamsOptions = {
      'filter[owner_id]': campaignId,
      include: 'template'
    };
    const paramsPO: HttpParamsOptions = {
      'filter[domain_id]': campaignId
    };
    if (campaignId) {
      combineLatest(
        this.campaignsService.getCampaign(campaignId).pipe(catchError(() => of(null))),
        this.commsService.getCommsEvent(paramsComm).pipe(catchError(() => of(null))),
        this.outcomesService.getOutcomes(paramsPO).pipe(catchError(() => of(null)))
      ).pipe(
        map(
          ([campaign, commEvent, outcomes]:
            [ICampaign | null, IComm | null, IOutcome[] | null]): ICampaign => ({
              ...campaign,
              audience: { select: commEvent && commEvent.poolId || null },
              channel: {
                type: commEvent && commEvent.channel || 'weblink',
                ...commEvent
              },
              outcomes: this.outcomeToRewardCollection(outcomes)
            }))
      ).subscribe(
        campaign => {
          this.campaign = Object.assign({}, campaign);
          this.store.initCampaign(campaign);
          this.form.patchValue({
            name: this.campaign.name
          });
        },
        () => this.router.navigateByUrl('/campaigns')
      );
    }
  }
}
