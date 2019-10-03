import { RewardsService } from './../../../core/services/rewards.service';
import { CampaignsService, EngagementsService, CommsService, OutcomesService, LimitsService } from '@cl-core/services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest, of, Observable } from 'rxjs';
import { IComm, ICampaign, IOutcome } from '@perx/whistler';
import { EngagementTypeFromAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';

@Component({
  selector: 'cl-review-campaign',
  templateUrl: './review-campaign.component.html',
  styleUrls: ['./review-campaign.component.scss']
})
export class ReviewCampaignComponent implements OnInit, OnDestroy {
  public campaign;

  constructor(
    private store: CampaignCreationStoreService,
    private router: Router,
    private campaignsService: CampaignsService,
    private rewardsService: RewardsService,
    private commsService: CommsService,
    private outcomesService: OutcomesService,
    private limitsService: LimitsService,
    private engagementsService: EngagementsService,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.store.currentCampaign$
      .asObservable()
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        this.campaign = data;
      });
    this.getCampaignData();
  }

  public comeBack(): void {
    this.router.navigateByUrl('/campaigns');
  }

  public ngOnDestroy(): void {
  }
  // TODO: it need for get right data from back end in the future
  private getCampaignData(): void {
    const campaignId = this.route.snapshot.params.id;
    const params: HttpParamsOptions = {
      'filter[campaign_entity_id]': campaignId
    };
    if (campaignId) {
      combineLatest(
        this.campaignsService.getCampaign(campaignId),
        this.commsService.getCommsTemplate(params).pipe(
          map((comms: IComm[]) => comms[0])
        ),
        this.commsService.getCommsEvents(params).pipe(
          map((comms: IComm[]) => comms[0])
        ),
        this.outcomesService.getOutcomes(params)).pipe(
          map(
            ([campaign, commTemplate, commEvent, outcomes]:
              [ICampaign, IComm, IComm, IOutcome[]]) => ({
                ...campaign,
                channel: {
                  type: campaign.channel.type,
                  ...commTemplate,
                  ...commEvent
                },
                rewardsList: outcomes
              })
          ),
          switchMap(campaign => {
            const params: HttpParamsOptions = {
              'filter[campaign_entity_id]': campaign.id
            };
            const eType = EngagementTypeFromAPIMapping[campaign.engagement_type];
            return combineLatest(
              of(campaign),
              this.engagementsService.getEngagement(campaign.engagement_id, campaign.engagement_type),
              this.limitsService.getLimits(params, eType).pipe(map(limits => limits[0])),
              this.getRewards(campaign.rewardsList)
            )
          }),
          map(([campaign, engagement, limits, rewards]) => ({
            ...campaign,
            template: engagement,
            limits,
            rewardsOptions: {
              rewards
            }
          }))
        ).subscribe(
          campaign => {
            this.campaign = campaign;
            this.store.updateCampaign(this.campaign);
          },
          (err) => console.log(err)
        );
    }
  }

  private getRewards(rewardsList: any[]): Observable<IRewardEntityForm[]> {
    if (!rewardsList || !rewardsList.length) {
      return of([]);
    }
    return combineLatest(...rewardsList.map(
      reward => this.rewardsService.getReward(reward.resultId).pipe(
        map(rewardData => ({ value: { ...rewardData, probability: reward.probability } }))
      )
    ));
  }
}
