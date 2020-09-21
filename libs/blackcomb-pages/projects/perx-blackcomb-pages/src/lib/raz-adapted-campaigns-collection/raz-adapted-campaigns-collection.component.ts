import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { CampaignType, ICampaign, LoyaltyService, StampService } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
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

  @Output()
  public selected: EventEmitter<ICampaign> = new EventEmitter<ICampaign>();

  public showAllCampaigns: boolean = false;
  public rewardsLeft: string;
  public campaigns: ICampaign[];
  public campaignsWithRewards$: Observable<ICampaign[]>;
  public campaignsWithProgress$: Observable<any[]>;
  public gamesLoaded: boolean = false;
  public isCampaignDisabled: boolean[] = [];
  public rewardsCountBvrSubjects: { [campaignId: string]: BehaviorSubject<number> } = {};

  constructor(
    private translate: TranslateService,
    private stampService: StampService,
    private loyaltyService: LoyaltyService
  ) { }

  // differentiate by the campaign_type
  // if stamps call the /stamp_cards api
  // if loyalty call /loyalty
  // if referral call as is but map the referral fields

  public ngOnInit(): void {
    this.translate.get('HOME.REWARDS_LEFT').subscribe((text) => {
      this.rewardsLeft = text;
    });

    if (this.campaigns$) {
      this.campaignsWithProgress$ = this.campaigns$.pipe(
        // call the mapperService here, have it as a method here first, priority: do stamps first
        switchMap(
          (campaigns: ICampaign[]) => zip(...campaigns.map(campaign => {
            if (campaign.type === CampaignType.stamp) {
              return this.stampService.getCards(campaign.id).pipe(
                map((stampCards) => ({
                    stages: stampCards[0].displayProperties.rewardPositions ? stampCards[0].displayProperties.rewardPositions.length : 2,
                    current: stampCards[0].stamps && stampCards[0].stamps.length,
                    stageLabels: stampCards[0].displayProperties.rewardPositions
                  }
                )),
                tap((res) => console.log('how would the stamp progress really look like?', res))
              ) as any;
            } else if (campaign.type === CampaignType.give_reward) {
              // only supports one loyalty prgm, hardcode default
               return this.loyaltyService.getLoyalty(1).pipe(
                 map((loyalty) => {
                   if (campaign.rewards && loyalty.currencyBalance) {
                     return {
                       stages: campaign.rewards.length || 2, // if length 0 default to 2 stages
                       // biggest reward return last, test if really need
                       // find the highest point and see if balance >=, at final stage
                       current: loyalty.currencyBalance,
                       stageLabels: campaign.rewards.reduce((acc, curr) => [...acc, (
                         curr && curr.customFields && curr.customFields.points
                       )], []).filter(v => v)
                     }
                   } else {
                     return {}; // return an empty obj
                   }
                 }),
                 tap((res) => console.log('how would the loyalty progress really look like?', res))
               );
            } else if (campaign.type === CampaignType.invite && campaign.referralRewards) {
              return of({
                stages: campaign.referralRewards.length || 2,
                current: campaign.refersAttained, // reached
                stageLabels: campaign.referralRewards.map(reward => reward.refereeRequired)
              })
            } else {
              return {}; // no progress
            }
          }))
        ),
        withLatestFrom(this.campaigns$),
        map(
          ([progress, campaigns]) => {
            return campaigns.map(campaign => ({ ...campaign, progress }));
          }
        )
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
