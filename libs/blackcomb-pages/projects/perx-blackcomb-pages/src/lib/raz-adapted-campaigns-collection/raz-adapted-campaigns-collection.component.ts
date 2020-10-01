import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { CampaignType, ICampaign, ICampaignService, LoyaltyService, ProgressBarFields, StampService } from '@perxtech/core';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { listAnimation } from '../home/games-collection/games-collection.animation';

@Component({
  selector: 'perx-blackcomb-pages-raz-adapted-campaigns-collection',
  templateUrl: './raz-adapted-campaigns-collection.component.html',
  styleUrls: ['./raz-adapted-campaigns-collection.component.scss'],
  animations: [listAnimation]

})
export class RazAdaptedCampaignsCollectionComponent implements OnInit {
  @Input('campaigns')
  public campaigns$: Observable<ICampaign[]>;
  @Input()
  public defaultNbCampaigns: number = 2;
  @Input()
  public withRewardsCounter: boolean = false;
  @Input()
  public withProgressBar: boolean;
  @Input()
  public gameType: string;
  @Input()
  public showProgressLabels: boolean = false;

  @Output()
  public selected: EventEmitter<ICampaign> = new EventEmitter<ICampaign>();

  public rewardsLeft: string;
  public campaigns: ICampaign[];
  public campaignsWithRewards$: Observable<ICampaign[]>;
  public campaignsWithProgress$: Observable<(ICampaign & {progress?: Partial<ProgressBarFields>})[]>;
  public gamesLoaded: boolean = false;
  public isCampaignDisabled: boolean[] = [];

  constructor(
    private stampService: StampService,
    private loyaltyService: LoyaltyService,
    private campaignsService: ICampaignService
  ) { }

  // differentiate by the campaign_type
  // if stamps call the /stamp_cards api
  // if loyalty call /loyalty
  // if referral call as is but map the referral fields

  public ngOnInit(): void {
    if (this.campaigns$) {
      this.campaignsWithProgress$ = this.campaigns$.pipe(
        // call the mapperService here, have it as a method here first, priority: do stamps first
        switchMap(
          (campaigns: ICampaign[]) => zip(...campaigns.map(campaign => {
            if (campaign.type === CampaignType.stamp) {
              return this.stampService.getCards(campaign.id).pipe(
                // there is only going to be one stamp. take first obj in array,
                // configured to be one single stampcard
                map((stampCards) => {
                  if (stampCards && stampCards[0] && stampCards[0].displayProperties) {
                    return ({
                        stages: stampCards[0].displayProperties.rewardPositions ?
                          stampCards[0].displayProperties.rewardPositions.length : 2,
                        current: (stampCards[0].stamps && stampCards[0].stamps.length) || 0,
                        stageLabels: stampCards[0].displayProperties.rewardPositions ?
                          stampCards[0].displayProperties.rewardPositions.sort((a, b) => a - b) :
                          []
                      }
                    );
                  }
                  return {};
                })
              ) as any;
            }
            if (campaign.type === CampaignType.give_reward) {
               return this.campaignsService.getCampaign(campaign.id).pipe(
                 concatMap((campaignRwd) => this.loyaltyService.getLoyalty(1).pipe(
                     map((loyalty) => {
                       if (campaignRwd.rewards) {
                         return {
                           stages: campaignRwd.rewards.length || 2, // if length 0 default to 2 stages
                           // biggest reward return last, test if really need
                           // find the highest point and see if balance >=, at final stage
                           current: loyalty.pointsBalance || 0,
                           stageLabels: campaignRwd.rewards.reduce((acc, curr) => [...acc, (
                             curr && curr.customFields && curr.customFields.requirement
                           )], []).filter(v => v)
                         };
                       }
                       return {};
                     })
                   )
               ));
            }
            if (campaign.type === CampaignType.invite) {
              // only from detail referral details appears on campaign_config
              return this.campaignsService.getCampaign(campaign.id).pipe(
                map(campaignInv => {
                  if (campaignInv.rewards) {
                    return {
                      stages: campaignInv.rewards.length || 2,
                      current: campaignInv.refersAttained, // reached
                      stageLabels: campaignInv.rewards.map(reward => reward.customFields && +reward.customFields.requirement)
                        .sort((a: number, b: number) => a - b)
                    };
                  }
                  return {};
                })
              );
            }
          }))
        ),
        withLatestFrom(this.campaigns$),
        map(
          ([progress, campaigns]) => {
            const ultimateCampaign = campaigns.find(campaign => campaign.name === 'Ultimate Task');
            const ultimateCampaignInd = campaigns.findIndex(campaign => campaign.name === 'Ultimate Task');
            const campaignsWithoutUltimateCampaign = campaigns.filter(campaign => campaign.name !== 'Ultimate Task');
            return [...campaignsWithoutUltimateCampaign, ultimateCampaign].map((campaign, index) =>
              // index skip over ultimateCampaign
              ({ ...campaign as ICampaign, progress: progress[index > ultimateCampaignInd ? index + 1 : index] as ProgressBarFields }))
          }
        ),
        // tap to see transformed
      );
    }
  }

  public selectCampaign(campaign: ICampaign): void {
    this.selected.emit(campaign);
  }

  public getCampaignImage(campaign: ICampaign): string {
    return campaign.campaignBannerUrl ? campaign.campaignBannerUrl : 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/35/580b585b2edbce24c47b2415-48075171-3595-4e55-b630-8a00b412dcc4.png';
  }
}
