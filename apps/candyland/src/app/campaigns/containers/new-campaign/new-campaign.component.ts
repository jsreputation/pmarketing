import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CampaignsService, SettingsService, OutcomesService, CommsService, LimitsService } from '@cl-core-services';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { MatDialog, MatStepper } from '@angular/material';
import { NewCampaignDonePopupComponent, NewCampaignDonePopupComponentData } from '../new-campaign-done-popup/new-campaign-done-popup.component';
import { Router, ActivatedRoute } from '@angular/router';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';

import { map, switchMap, tap, catchError, takeUntil } from 'rxjs/operators';
import { combineLatest, iif, of, Observable, Subject } from 'rxjs';

import { IWCampaignAttributes, IWCommTemplateAttributes } from '@perx/whistler';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { IComm } from '@cl-core/models/comm/schedule';
import { IOutcome } from '@cl-core/models/outcome/outcome';
import { EngagementType } from '@cl-core/models/engagement/engagement-type.enum';

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

  private destroy$: Subject<any> = new Subject();

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
  ) {
    store.resetCampaign();
  }

  public ngOnInit(): void {
    this.getTenants();
    this.initForm();
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
    let saveCampaign$;
    this.store.updateCampaign(this.form.value);
    if (this.store.currentCampaign.id) {
      saveCampaign$ = this.campaignsService.updateCampaign(this.store.currentCampaign);
    } else {
      saveCampaign$ = this.campaignsService.createCampaign(this.store.currentCampaign);
    }

    const hasLimitData = () => this.store.currentCampaign.limits && this.store.currentCampaign.limits.times;
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

  private updateLimitFn(): (campaign: ICampaign) => Observable<any> {
    let generateLimitData$;

    const updateLimit$ = campaign => this.limitsService.updateLimits(
      this.store.currentCampaign.limits.id,
      this.store.currentCampaign.limits,
      this.store.currentCampaign.template.attributes_type,
      campaign.id,
      this.store.currentCampaign.template.id
    );
    const createLimit$ = campaign => this.limitsService.createLimits(
      this.store.currentCampaign.limits,
      this.store.currentCampaign.template.attributes_type,
      campaign.id,
      this.store.currentCampaign.template.id
    );

    if (this.store.currentCampaign) {
      generateLimitData$ = this.store.currentCampaign.limits.id ? updateLimit$ : createLimit$;
    } else {
      generateLimitData$ = createLimit$;
    }
    return generateLimitData$;
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
    if (this.store.currentCampaign.template.attributes_type === EngagementType.stamp) {
      this.store.currentCampaign.rewardsListCollection.forEach(
        rewardsData => {
          const updateOutcomeList = this.updateOutcomeWhenEdit(
            campaign,
            rewardsData.rewardsOptions && rewardsData.rewardsOptions.rewards,
            rewardsData.rewardsOptions && rewardsData.rewardsOptions.enableProbability,
            rewardsData.stampSlotNumber
          );
          updateOutcomesArr$ = [...updateOutcomesArr$, ...updateOutcomeList];

        });
    } else {
      const rewardsOptions = this.store.currentCampaign.rewardsOptions;
      updateOutcomesArr$ = this.updateOutcomeWhenEdit(
        campaign,
        rewardsOptions && rewardsOptions.rewards,
        rewardsOptions && rewardsOptions.enableProbability
      );
    }

    if (updateOutcomesArr$.length <= 0) {
      return of([]);
    }
    return combineLatest(...updateOutcomesArr$);
  }

  private updateOutcomeWhenEdit(
    campaign: ICampaign,
    data: { value: IRewardEntity, probability: number }[],
    enableProbability: boolean,
    slotNumber?: number
  ): Observable<any>[] {
    if (!data || data.length <= 0) {
      return [];
    }
    const updateOutcomesArr$ = [];
    const oldCampaignList = this.store.currentCampaign.rewardsList;
    const deleteOutcomes$ = outcomeId => this.outcomesService.deleteOutcome(outcomeId);
    const updateOutcomes$ = outcomeData => this.outcomesService.updateOutcome(outcomeData, campaign.id, enableProbability, slotNumber);
    const createOutcomes$ = outcomeData => this.outcomesService.createOutcome(outcomeData, campaign.id, enableProbability, slotNumber);

    data.forEach(outcome => {
      if (this.store.currentCampaign.id) {
        if (outcome.value.outcomeId) {
          const oldRewardRecord = oldCampaignList.find(reward => reward.id === outcome.value.outcomeId);
          const oldProbability = oldRewardRecord ? oldRewardRecord.probability : null;
          if (oldProbability !== outcome.probability) {
            updateOutcomesArr$.push(updateOutcomes$(outcome));
          }
        } else {
          updateOutcomesArr$.push(createOutcomes$(outcome));
        }
      } else {
        updateOutcomesArr$.push(createOutcomes$(outcome));
      }
    });
    if (oldCampaignList && oldCampaignList.length >= 0) {
      oldCampaignList.forEach(oldReward => {
        const isOutcomeExist = data.find(oc => oc.value.outcomeId === oldReward.id);
        if (!isOutcomeExist) {
          updateOutcomesArr$.push(deleteOutcomes$(oldReward.id));
        }
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
        map((users: IJsonApiItem<IUserApi>[]) => users.map(u => u.attributes.primary_identifier)),
        takeUntil(this.destroy$)
      );
    return combineLatest(getUsersPis, this.blackcombUrl)
      .pipe(map(([pis, url]: [string[], string]) => {
        return pis.reduce((p: string, v: string) => `${p}${v},${url}&pi=${v},\n`, 'identifier,urls,\n');
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
        switchMap((config) => this.dialog.open(NewCampaignDonePopupComponent, { data: config }).afterClosed())
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

  private handleRouteParams(): void {
    const campaignId = this.route.snapshot.params.id;
    const paramsComm: HttpParamsOptions = {
      'filter[owner_id]': campaignId,
      include: 'template',
    };
    const paramsPO: HttpParamsOptions = {
      'filter[campaign_entity_id]': campaignId
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
              rewardsList: outcomes
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
