import { RewardsService } from './../../../core/services/rewards.service';
import { CampaignsService, EngagementsService, CommsService, OutcomesService, LimitsService } from '@cl-core/services';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { combineLatest, of, Observable, Subject } from 'rxjs';

import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { IComm } from '@cl-core/models/comm/schedule';
import { IOutcome } from '@cl-core/models/outcome/outcome';
import { ILimit } from '@cl-core/models/limit/limit.interface';

@Component({
  selector: 'cl-review-campaign',
  templateUrl: './review-campaign.component.html',
  styleUrls: ['./review-campaign.component.scss']
})
export class ReviewCampaignComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();

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
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.store.resetCampaign();
    this.getCampaignData();
  }

  public comeBack(): void {
    this.router.navigateByUrl('/campaigns');
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // TODO: it need for get right data from back end in the future
  private getCampaignData(): void {
    const campaignId = this.route.snapshot.params.id;
    const params: HttpParamsOptions = {
      'filter[owner_id]': campaignId,
      'filter[owner_type]': 'Perx::Campaign::Entity',
      include: 'template',
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
              rewardsList: outcomes
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
            this.getRewards(campaign.rewardsList)
          );
        }),
        map(([campaign, engagement, limits, rewards]:
          [
            ICampaign | null, IEngagement | null, ILimit | null,
            { value: IRewardEntity, probability?: number, stampsSlotNumber?: number }[] | null
          ]) => {
          let rewardsOptions = null;
          let rewardsListCollection = null;
          if (campaign.engagement_type === 'stamps') {
            const transformedRewards = {};
            rewards.forEach(reward => {
              if (!transformedRewards[reward.stampsSlotNumber]) {
                transformedRewards[reward.stampsSlotNumber] = {
                  stampSlotNumber: reward.stampsSlotNumber,
                  rewardsOptions: {
                    enableProbability: !!reward.probability,
                    rewards: [reward]
                  }
                };
              } else {
                transformedRewards[reward.stampsSlotNumber].rewardsOptions.rewards =
                  [...transformedRewards[reward.stampsSlotNumber].rewardsOptions.rewards, reward];
              }
            });
            rewardsListCollection = [...Object.values(transformedRewards)];
          } else {
            rewardsOptions = {
              enableProbability: rewards.some(reward => !!reward.probability),
              rewards
            };
          }
          return {
            ...campaign,
            template: engagement,
            limits,
            rewardsOptions,
            rewardsListCollection
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

  private getRewards(rewardsList: any[]): Observable<{ value: IRewardEntity | null, probability?: number, stampsSlotNumber?: number }[]> {
    if (!rewardsList || !rewardsList.length) {
      return of([]);
    }
    return combineLatest(...rewardsList.map(
      reward => {
        if (reward.resultId) {
          return this.rewardsService.getReward(reward.resultId).pipe(
            map(rewardData => ({ value: { ...rewardData }, probability: reward.probability, stampsSlotNumber: reward.lootBoxId })),
            catchError(() => of({ value: null, probability: reward.probability, stampsSlotNumber: reward.lootBoxId }))
          );
        }
        return of({ value: null, probability: reward.probability, stampsSlotNumber: reward.lootBoxId });
      }
    ));
  }
}
