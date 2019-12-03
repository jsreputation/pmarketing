import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { RewardsService } from '@cl-core/services/rewards.service';
import {
  CampaignsService,
  EngagementsService,
  CommsService,
  OutcomesService,
  LimitsService,
  SettingsService
} from '@cl-core/services';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { combineLatest, of, Observable, Subject } from 'rxjs';

import { ICampaign, ICampaignOutcome } from '@cl-core/models/campaign/campaign.interface';
import { IComm } from '@cl-core/models/comm/schedule';
import { IOutcome } from '@cl-core/models/outcome/outcome';
import { ILimit } from '@cl-core/models/limit/limit.interface';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { IEngagementType } from '@cl-core/models/engagement/engagement.interface';

@Component({
  selector: 'cl-review-campaign',
  templateUrl: './review-campaign.component.html',
  styleUrls: ['./review-campaign.component.scss']
})
export class ReviewCampaignComponent implements OnInit, OnDestroy {
  public tenantSettings: ITenantsProperties;
  private destroy$: Subject<void> = new Subject();

  public campaign: any;

  constructor(
    private store: CampaignCreationStoreService,
    private router: Router,
    private campaignsService: CampaignsService,
    private rewardsService: RewardsService,
    private commsService: CommsService,
    private outcomesService: OutcomesService,
    private limitsService: LimitsService,
    private engagementsService: EngagementsService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.store.resetCampaign();
    this.getTenants();
    this.getCampaignData();
  }

  public comeBack(): void {
    this.router.navigateByUrl('/campaigns');
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.cd.detectChanges();
      });
  }

  // TODO: it need for get right data from back end in the future
  private getCampaignData(): void {
    const campaignId = this.route.snapshot.params.id;
    const params: HttpParamsOptions = {
      'filter[owner_id]': campaignId,
      'filter[owner_type]': 'Perx::Campaign::Entity',
      include: 'template'
    };
    const paramsPO: HttpParamsOptions = {
      'filter[campaign_entity_id]': campaignId
    };
    if (campaignId) {
      combineLatest(
        this.campaignsService.getCampaign(campaignId).pipe(catchError(() => of(null))),
        this.commsService.getCommsEvent(params).pipe(catchError(() => of(null))),
        this.outcomesService.getOutcomes(paramsPO).pipe(catchError(() => of(null)))
      ).pipe(
        map(
          ([campaign, commEvent, outcomes]:
            [ICampaign | null, IComm | null, IOutcome[] | null]) => ({
              ...campaign,
              audience: { select: commEvent && commEvent.poolId || null },
              channel: {
                type: commEvent && commEvent.channel || 'weblink',
                message: commEvent && commEvent.message,
                schedule: commEvent && { ...commEvent.schedule }
              },
              outcomes: this.outcomeToRewardCollection(outcomes)
            })
        ),
        switchMap((campaign: ICampaign) => {
          const limitParams: HttpParamsOptions = {
            'filter[campaign_entity_id]': campaign.id
          };
          const eType = campaign.engagement_type;
          return combineLatest(
            of(campaign),
            this.engagementsService.getEngagement(campaign.engagement_id, campaign.engagement_type),
            this.limitsService.getLimits(limitParams, eType).pipe(map(limits => limits[0]), catchError(() => of({ times: null }))),
            this.getRewards(campaign.outcomes)
          );
        }),
        map(([campaign, engagement, limits, outcomes]:
          [
            ICampaign | null, IEngagementType | null, ILimit | null,
            ICampaignOutcome[] | null
          ]) => {
          return {
            ...campaign,
            template: engagement,
            limits,
            outcomes
          };
        }),
        takeUntil(this.destroy$),
      ).subscribe(
        campaign => {
          this.campaign = campaign;
          this.store.updateCampaign(this.campaign);
          this.cd.detectChanges();
        },
        (err) => console.log(err)
      );
    }
  }

  private outcomeToRewardCollection(outcomes: IOutcome[]): ICampaignOutcome[] {
    const collections: ICampaignOutcome[] = [];
    outcomes.forEach(outcome => collections.push({ outcome, slotInfo: { slotNumber: outcome.slotNumber } }));
    return collections;
  }

  private getRewards(outcomeList: ICampaignOutcome[]):
    Observable<ICampaignOutcome[]> {
    if (!outcomeList || !outcomeList.length) {
      return of([]);
    }
    return combineLatest(...outcomeList.map(
      outcomeData => {
        const outcome = outcomeData.outcome;
        if (outcome.resultId) {
          return this.rewardsService.getReward(outcome.slotNumber.toString()).pipe(
            map(rewardData => ({
              outcome,
              rewardsOptions: { ...rewardData, limit: outcome.limit || null, probability: outcome.probability, },
              slotInfo: {
                slotNumber: outcome.slotNumber
              }
            })),
            catchError(() =>
              of({
                outcome,
                rewardsOptions: { limit: outcome.limit || null, probability: outcome.probability },
                slotInfo: {
                  stampsSlotNumber: outcome.slotNumber
                }
              }))
          );
        }
        return of({
          outcome,
          rewardsOptions: { limit: outcome.limit || null, probability: outcome.probability },
          slotInfo: {
            stampsSlotNumber: outcome.slotNumber
          }
        });
      }
    ));
  }
}
