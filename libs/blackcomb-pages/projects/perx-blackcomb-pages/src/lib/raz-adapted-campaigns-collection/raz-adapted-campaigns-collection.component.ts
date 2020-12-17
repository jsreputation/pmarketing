import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { ICampaign, ICampaignService, IStampCard, ProgressBarFields, StampService, TransactionsService } from '@perxtech/core';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { oc } from 'ts-optchain';

const DEFAULT_PAGE_SIZE = 25;

@Component({
  selector: 'perx-blackcomb-pages-raz-adapted-campaigns-collection',
  templateUrl: './raz-adapted-campaigns-collection.component.html',
  styleUrls: ['./raz-adapted-campaigns-collection.component.scss'],
})
export class RazAdaptedCampaignsCollectionComponent implements OnInit {
  @Input()
  public stampCampaigns: Observable<ICampaign[]>;
  @Input()
  public loyaltyCampaigns: Observable<ICampaign[]>;
  @Input()
  public referralCampaigns: Observable<ICampaign[]>;

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

  public stampCampaignsProg: Observable<(ICampaign & { progress?: ProgressBarFields })[]>;
  public loyaltyCampaignsProg: Observable<(ICampaign & { progress?: ProgressBarFields })[]>;
  public referralCampaignsProg: Observable<(ICampaign & { progress?: ProgressBarFields })[]>;
  public ultimateCampaignsProg: Observable<(ICampaign & { progress?: ProgressBarFields })[]>;

  public rewardsLeft: string;
  public campaigns: ICampaign[];
  public campaignsWithRewards$: Observable<ICampaign[]>;
  public isCampaignDisabled: boolean[] = [];

  constructor(
    private stampService: StampService,
    private campaignsService: ICampaignService,
    private transactionsService: TransactionsService
  ) { }
  // differentiate by the campaign_type
  // if stamps call the /stamp_cards api
  // if loyalty call /loyalty
  // if referral call as is but map the referral fields

  public mapStampCampaign(stampCards: IStampCard[], current?: number): ({ progress: ProgressBarFields } | {}) {
    if (stampCards && stampCards[0] && stampCards[0].displayProperties) {
      const lengthOfRewardPos = oc(stampCards[0].displayProperties.rewardPositions)([]).length;
      return {
        progress: {
          stages: lengthOfRewardPos ?
            (lengthOfRewardPos === 1 || lengthOfRewardPos === 2) ?
              (lengthOfRewardPos + 1) : lengthOfRewardPos : 2,
          current: (current !== undefined ? current : (stampCards[0].stamps && stampCards[0].stamps.length) || 0),
          stageLabels: stampCards[0].displayProperties.rewardPositions ?
            ((lengthOfRewardPos === 1 || lengthOfRewardPos === 2) ?
              [0, ...stampCards[0].displayProperties.rewardPositions].sort((a, b) => a - b)
              : [...stampCards[0].displayProperties.rewardPositions].sort((a, b) => a - b)) : // if len is only 1 add 0
            []
        }
      };
    }
    return {};
  }

  public ngOnInit(): void {
    if (this.stampCampaigns) {
      this.stampCampaignsProg = this.stampCampaigns.pipe(
        map(campaignsStamps => campaignsStamps.filter(campaign => campaign.name !== 'Ultimate Reward')),
        switchMap(
          (campaigns: ICampaign[]) => zip(...campaigns.map(campaign => this.stampService.getCards(campaign.id).pipe(
            // there is only going to be one stamp. take first obj in array,
            // configured to be one single stampcard
            switchMap((stampCards) => {
              if (oc(campaign).customFields.transaction_based(false)) {
                return this.transactionsService.getTransactions(
                  1, DEFAULT_PAGE_SIZE, campaign.customFields.min_spend || 0).pipe(
                    map(transactionData => ({
                      ...campaign as ICampaign,
                      ...this.mapStampCampaign(stampCards, (transactionData.length ? transactionData[0].razerStampsCount : 0))
                    }))
                  );
              }
              return of({
                ...campaign as ICampaign,
                ...this.mapStampCampaign(stampCards)
              });
              }
            )
          )
          )))
      );

      this.ultimateCampaignsProg = this.stampCampaigns.pipe(
        map(campaignsStamps => campaignsStamps.filter(campaign => campaign.name === 'Ultimate Reward')),
        switchMap(
          (campaigns: ICampaign[]) => zip(...campaigns.map(campaign => this.stampService.getCards(campaign.id).pipe(
            // there is only going to be one stamp. take first obj in array,
            // configured to be one single stampcard
            map((stampCards) => ({
              ...campaign as ICampaign,
              ...this.mapStampCampaign(stampCards)
            }))
          )
          )))
      );
    }

    if (this.loyaltyCampaigns) {
      this.loyaltyCampaignsProg = this.loyaltyCampaigns.pipe(
        switchMap(
          (campaigns: ICampaign[]) => zip(...campaigns.map(campaign => this.campaignsService.getCampaign(campaign.id).pipe(
            concatMap((campaignRwd) => this.transactionsService.getTransactionSummary().pipe(
              map((summary) => {
                if (summary && campaignRwd.rewards) {
                  return {
                    ...campaign,
                    progress: {
                      stages: campaignRwd.rewards.length || 2, // if length 0 default to 2 stages
                      // biggest reward return last, test if really need
                      // find the highest point and see if balance >=, at final stage
                      current: ((summary.totalAmount || 0) / 100) || 0,
                      stageLabels: campaignRwd.rewards.reduce((acc, curr) => [...acc, (
                        curr && curr.customFields && curr.customFields.requirement
                      )], []).filter(v => v) as unknown as number[]
                    }
                  };
                }
                return {} as ICampaign;
              })
            )
            ))))
        )
      );
    }

    if (this.referralCampaigns) {
      this.referralCampaignsProg = this.referralCampaigns.pipe(
        switchMap(
          (campaigns: ICampaign[]) => zip(...campaigns.map(campaign =>
            // only from detail referral details appears on campaign_config
            this.campaignsService.getCampaign(campaign.id).pipe(
              map(campaignInv => {
                if (campaignInv.rewards) {
                  return {
                    ...campaign,
                    progress: {
                      stages: campaignInv.rewards.length || 2,
                      current: campaignInv.refersAttained || 0, // reached
                      stageLabels: campaignInv.rewards.map(reward => reward.customFields && +reward.customFields.requirement)
                        .sort((a: number, b: number) => a - b) as unknown as number[]
                    }
                  };
                }
                return {} as ICampaign;
              })
            )
          ))
        )
      );
    }
  }

  public selectCampaign(campaign: ICampaign): void {
    this.selected.emit(campaign);
  }
}
