import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CampaignsService, SettingsService, OutcomesService, CommsService, LimitsService } from '@cl-core-services';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { MatDialog, MatStepper } from '@angular/material';
import {
  NewCampaignDonePopupComponent,
  NewCampaignDonePopupComponentData
} from '../new-campaign-done-popup/new-campaign-done-popup.component';
import { Router, ActivatedRoute } from '@angular/router';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';

import { map, switchMap, tap, catchError, takeUntil } from 'rxjs/operators';
import { combineLatest, iif, of, Observable, Subject } from 'rxjs';

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
  private campaignBaseURL: string;
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
    private audienceService: AudiencesUserService
  ) {
    store.resetCampaign();
  }

  public ngOnInit(): void {
    this.getTenants();
    this.initForm();
    this.store.currentCampaign$.subscribe(console.log);
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

    const hasLimitData = () => this.store.currentCampaign.limits;
    const generateLimitData$ = this.updateLimitFn();

    saveCampaign$.pipe(
      tap((res: IJsonApiPayload<IWCampaignAttributes>) => this.campaignBaseURL = `${this.campaignBaseURL}?cid=${res.data.id}`),
      switchMap(
        (res: IJsonApiPayload<IWCampaignAttributes>) => combineLatest(
          iif(hasLimitData, generateLimitData$(res.data), of(res)).pipe(catchError(() => of(null))),
          this.updateOutcomes(res.data).pipe(catchError(() => of(null))),
          this.updateComm(res.data).pipe(catchError(() => of(null)))
        )
      ),
      takeUntil(this.destroy$)
    ).subscribe(
      data => {
        if (data) {
          this.openDialog();
        }
      },
      (error: Error) => console.warn(error.message)
    );
  }

  private updateLimitFn(): (campaign: ICampaign) => Observable<IJsonApiPayload<IWLimitAttributes> | void> {
    const updateLimit$ = (campaign: ICampaign) => this.limitsService.updateLimit(
      this.store.currentCampaign.limits.id,
      this.store.currentCampaign.limits,
      this.store.currentCampaign.template.attributes_type,
      Number.parseInt(campaign.id, 10),
      this.store.currentCampaign.template.id
    );
    const createLimit$ = (campaign: ICampaign) => this.limitsService.createLimit(
      this.store.currentCampaign.limits,
      this.store.currentCampaign.template.attributes_type,
      Number.parseInt(campaign.id, 10),
      this.store.currentCampaign.template.id
    );

    return (this.store.currentCampaign && this.store.currentCampaign.limits.id) ? updateLimit$ : createLimit$;
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
        updateOutcomesArr$.push(deleteOutcomes$(oldReward.outcome.id));
      });
    }
    return updateOutcomesArr$;
  }

  private getDialogData(campaign: ICampaign): Observable<NewCampaignDonePopupComponentData> {
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
      return this.blackcombUrl
        .pipe(map(url => ({
          title,
          subTitle: 'Copy the link and share your campaign.',
          url,
          type
        })));
    }

    return of({
      title,
      type
    });
  }

  private buildCampaignCsv(campaign: ICampaign): Observable<string> {
    const getUsersPis: Observable<string[]> = this.audienceService
      .getAllPoolUser(campaign.audience.select)
      .pipe(
        map((users: IJsonApiItem<IWProfileAttributes>[]) => users.map(u => u.attributes.primary_identifier)),
        takeUntil(this.destroy$)
      );
    return combineLatest(getUsersPis, this.blackcombUrl)
      .pipe(map(([pis, url]: [string[], string]) => {
        return pis.reduce((p: string, v: string) =>
          `${p}${v},${url}&pi=${v},\n`, 'identifier,urls,\n');
      }),
        takeUntil(this.destroy$)
      );
  }

  private get blackcombUrl(): Observable<string> {
    return of(this.campaignBaseURL);
  }

  private openDialog(): void {
    this.getDialogData(this.store.currentCampaign)
      .pipe(
        switchMap((config) => this.dialog.open(NewCampaignDonePopupComponent,
          { data: config }).afterClosed())
      )
      .subscribe(() => this.router.navigate(['/campaigns']));
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.campaignBaseURL = res.display_properties.campaign_base_url;
        this.cdr.detectChanges();
      });
  }

  private outcomeToRewardCollection(outcomes: IOutcome[]): ICampaignOutcome[] {
    const collections: ICampaignOutcome[] = [];
    outcomes.forEach(outcome => collections.push({ outcome }));
    return collections;
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
