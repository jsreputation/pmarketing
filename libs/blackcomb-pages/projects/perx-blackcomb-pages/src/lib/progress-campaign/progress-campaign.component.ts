import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  filter,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import {
  CampaignType,
  ConfigService,
  ICampaign,
  ICampaignService,
  IConfig,
  IFlags,
  IReward,
  LoyaltyService,
  ProgressBarFields,
  SettingsService,
  StampService,
  IVoucherService,
  Voucher,
  TransactionsService,
  TransactionState,
  IStampCard,
  IStamp,
} from '@perxtech/core';
import {
  ActivatedRoute,
  NavigationExtras,
  ParamMap,
  Router
} from '@angular/router';
import {
  combineLatest,
  Observable,
  of,
  throwError
} from 'rxjs';
import { ProgressInfoPipe } from '@perxtech/core';
import { oc } from 'ts-optchain';

export enum CampaignRewardMode {
  TransactionAmount = 'trans-amount',
  TransactionQuantity = 'trans-qty',
  Referral = 'referral'
}

// helper function for Ts to detect removed undefined
const isNumber = (obj: any): obj is number => typeof obj === 'number';

const DEFAULT_PAGE_SIZE = 25;


@Component({
  selector: 'perx-blackcomb-pages-progress-campaign',
  templateUrl: './progress-campaign.component.html',
  styleUrls: ['./progress-campaign.component.scss']
})
export class ProgressCampaignComponent implements OnInit {
  public appConfig: IConfig<void>;
  public appRemoteFlags: IFlags;
  public campaign$: Observable<ICampaign>;
  public campaign: ICampaign;
  public campaignProgress: Partial<ProgressBarFields>;
  public campaignRewards$: Observable<IReward[]>;
  public campaignProgress$: Observable<Partial<ProgressBarFields>>;
  public campaignRewardMode!: CampaignRewardMode;
  public campaignRewards: (IReward & { progress: ProgressBarFields, barHeadLine: string, meetShowVoucherRequirement: boolean })[];
  public meetShowVoucherRequirement: boolean = true; // only pay and spend take and adjusts this

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    protected configService: ConfigService,
    protected loyaltyService: LoyaltyService,
    protected campaignService: ICampaignService,
    protected settingsService: SettingsService,
    protected stampService: StampService,
    protected voucherService: IVoucherService,
    protected transactionsService: TransactionsService,
    private progressInfoPipe: ProgressInfoPipe,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.campaign$ = this.configService.readAppConfig<void>().pipe(
      map((config: IConfig<void>) => this.appConfig = config),
      switchMap(() => this.settingsService.getRemoteFlagsSettings()),
      tap((flags: IFlags) => {
        this.appRemoteFlags = flags;
      }),
      switchMap(() => this.route.paramMap),
      filter((params: ParamMap) => params.has('id')),
      switchMap((params: ParamMap) => {
        const id: string | null = params.get('id');
        if (!id) {
          return throwError({ message: 'campaign id is required' });
        }
        const idN = Number.parseInt(id, 10);
        return this.campaignService.getCampaign(idN);
      }),
      tap((campaign) => this.campaign = campaign),
    );


    this.campaignProgress$ = this.campaign$.pipe(
      switchMap((campaign) => {
        if (campaign.type === CampaignType.stamp) {
          return this.stampService.getCards(campaign.id).pipe(
            // there is only going to be one stamp. take first obj in array,
            // configured to be one single stampcard
            switchMap((stampCards) => {
              if (oc(campaign).customFields.transaction_based(false)) {
                return this.transactionsService.getTransactions(
                  1, DEFAULT_PAGE_SIZE, campaign.customFields.min_spend || 0).pipe(
                    map(transactionData => ({
                      ...this.mapStampCampaign(stampCards, (transactionData.length ? transactionData[0].razerStampsCount : 0) || 0)
                    }))
                  );
              }
              return of({
                ...campaign as ICampaign,
                ...this.mapStampCampaign(stampCards)
              });
            }
            )
          );
        }
        if (campaign.type === CampaignType.give_reward) {
          // only supports one loyalty prgm, hardcode default
          const transactionSummary$ = this.transactionsService.getTransactionSummary();
          // doing this because
          // this had to be the only object passed to campaign progress, cant off fetch from reward observable the state
          // to do actual light up of stamps, campaign progress bar is | async to campaignprogress and only updates from here
          const transactionSummaryProcessed$ = this.transactionsService.getTransactionSummary(TransactionState.processed);
          return combineLatest(transactionSummary$, transactionSummaryProcessed$).pipe(
              map(([summaryFull, summaryProcessed]) => {
                if (campaign.rewards) {
                  return {
                    stages: campaign.rewards.length || 2, // if length 0 default to 2 stages
                    // biggest reward return last, test if really need
                    // find the highest point and see if balance >=, at final stage
                    lightStage: summaryProcessed.totalAmount ? (summaryProcessed.totalAmount / 100) : undefined,
                    current: (summaryFull.totalAmount || 0) / 100,
                    stageLabels: campaign.rewards.reduce((acc, curr) => [...acc, (
                      curr && curr.customFields && curr.customFields.requirement
                    )], []).filter(v => v)
                  };
                }
                return {}; // return an empty obj
              })
          );
        }
        if (campaign.type === CampaignType.invite) {
          // only from detail referral details appears on campaign_config
          return this.campaignService.getCampaign(campaign.id).pipe(
            map(campaignInv => {
              if (campaignInv.rewards) {
                return {
                  stages: campaignInv.rewards.length || 2,
                  current: campaignInv.refersAttained, // reached
                  stageLabels: campaignInv.rewards.map(reward => reward.customFields && (+reward.customFields.requirement || 0))
                    .sort((a: number, b: number) => a - b)
                };
              }
              return {};
            })
          );
        }
        return {} as Iterable<any>;
      }),
      tap((campaignProgress) => this.campaignProgress = campaignProgress)
    );

    // different campaigns get rewards differently
    this.campaignRewards$ = this.campaign$.pipe(
      switchMap((campaign) => {
        if (campaign.type === CampaignType.stamp) {
          this.campaignRewardMode = CampaignRewardMode.TransactionQuantity;
          this.cd.detectChanges();
          return this.stampService.getCards(campaign.id).pipe(
            switchMap(
              stampCardData => {
                const stampCard = stampCardData[0];
                if (stampCard && campaign && campaign.rewards) {
                  let progress: Partial<ProgressBarFields> = {};
                  // ASSUMING Rewards are SORTED according to increasing amount of points_required
                  const rewardPositionsSorted = stampCard.displayProperties.rewardPositions ?
                    stampCard.displayProperties.rewardPositions.sort((a, b) => a - b) : [];

                  if (oc(campaign).customFields.transaction_based(false)) {
                    return this.transactionsService.getTransactions(
                      1, DEFAULT_PAGE_SIZE, campaign.customFields.min_spend || 0, TransactionState.processed).pipe(
                        map(transactionData => {
                          if (campaign && campaign.rewards) {
                            return campaign.rewards.map((reward, index) => {
                              if (rewardPositionsSorted.length && rewardPositionsSorted[index]) {
                                const stageLabels = [0, rewardPositionsSorted[index]];
                                progress = {
                                  stages: stageLabels.length,
                                  current: (transactionData.length ?
                                    transactionData[0].razerStampsCount : 0) >= rewardPositionsSorted[index] ?
                                    rewardPositionsSorted[index] : (transactionData.length ? transactionData[0].razerStampsCount : 0),
                                  stageLabels
                                };
                              }
                              return {
                                ...reward,
                                meetShowVoucherRequirement: (stampCard.stamps as IStamp[]).length >= rewardPositionsSorted[index],
                                progress,
                                barHeadLine: this.progressInfoPipe
                                .transform(`${this.campaignProgress.current || 0}`, this.campaignRewardMode,
                                  this.campaign.name)
                              };
                            });
                          }
                        })
                      );
                  }// note end here

                  // only stamps issued will be inside stamps property(use it to get progress)
                  if (campaign && campaign.rewards) {
                    return of(campaign.rewards.map((reward, index) => {
                      if (rewardPositionsSorted.length && rewardPositionsSorted[index]) {
                        const stageLabels = [0, rewardPositionsSorted[index]];
                        progress = {
                          stages: stageLabels.length,
                          current: oc(stampCard).stamps.length(0) >= rewardPositionsSorted[index] ?
                            rewardPositionsSorted[index] : oc(stampCard).stamps.length(0),
                          stageLabels
                        };
                      }

                      return {
                        ...reward,
                        meetShowVoucherRequirement: true,
                        progress,
                        barHeadLine: this.progressInfoPipe.transform(`${this.campaignProgress.current || 0}`, this.campaignRewardMode,
                          this.campaign.name)
                      };
                    }));
                  }
                }
                return [];
              }
            )
          );
        }
        // for referrals
        if (campaign.type === CampaignType.give_reward) {
          this.campaignRewardMode = CampaignRewardMode.TransactionAmount;
          this.cd.detectChanges();
          return this.transactionsService.getTransactionSummary(TransactionState.processed).pipe(
            map((summary) => {
              if (campaign.rewards) {
                const completeStageLabels: number[] = campaign.rewards.reduce((acc, curr) => [...acc, (
                  curr && curr.customFields && +curr.customFields.requirement
                )], []).filter(isNumber);
                let progress: Partial<ProgressBarFields> = {};
                return campaign.rewards.map((reward, index) => {
                  const meetShowVoucherRequirement = ((summary.totalAmount || 0) / 100) >= completeStageLabels[index];
                  if (completeStageLabels && completeStageLabels[index]) {
                    const stageLabels = [0, completeStageLabels[index]];
                    progress = {
                      stages: stageLabels.length || 2, // actually it's always going to be 2, can just hardcode 2
                      current: (this.campaignProgress.current ? this.campaignProgress.current : 0) >= completeStageLabels[index] ?
                        completeStageLabels[index] : (this.campaignProgress.current ? this.campaignProgress.current : 0),
                      lightStage: meetShowVoucherRequirement ? completeStageLabels[completeStageLabels.length - 1] : 0,
                      stageLabels
                    };
                  }
                  return {
                    ...reward,
                    meetShowVoucherRequirement,
                    progress,
                    barHeadLine: this.progressInfoPipe.transform(`${this.campaignProgress.current || 0}`, this.campaignRewardMode,
                      this.campaign.name)
                  };
                });
              }
              return [];
            })
          );
        }
        if (campaign.type === CampaignType.invite) {
          this.campaignRewardMode = CampaignRewardMode.Referral;
          this.cd.detectChanges();
          return this.campaignService.getCampaign(campaign.id).pipe(
            map(campaignInv => {
              if (campaignInv.rewards) {
                const completeStageLabels: number[] = campaignInv.rewards.reduce((acc, curr) => [...acc, (
                  curr && curr.customFields && +curr.customFields.requirement
                )], []).filter(isNumber);
                let progress: Partial<ProgressBarFields> = {};
                return campaignInv.rewards.map((reward, index) => {
                  if (completeStageLabels && completeStageLabels[index]) {
                    const stageLabels = [0, completeStageLabels[index]];
                    progress = {
                      stages: stageLabels.length || 2, // actually it's always going to be 2, can just hardcode 2
                      current: (campaignInv.refersAttained || 0) >= completeStageLabels[index] ?
                        completeStageLabels[index] : (campaignInv.refersAttained || 0),
                      stageLabels
                    };
                  }
                  return {
                    ...reward,
                    meetShowVoucherRequirement: true,
                    progress,
                    barHeadLine: this.progressInfoPipe.transform(`${this.campaignProgress.current || 0}`, this.campaignRewardMode,
                      this.campaign.name)
                  };
                });
              }
              return [];
            })
          );
        }
        return [];
      }),
      tap((rewardsWithProgress: (IReward & {
        meetShowVoucherRequirement: boolean,
        progress: ProgressBarFields,
        barHeadLine: string
      })[]) => this.campaignRewards = rewardsWithProgress)
    );
  }

  public mapStampCampaign(stampCards: IStampCard[], current?: number): (ProgressBarFields | {}) {
    if (stampCards && stampCards[0] && stampCards[0].displayProperties) {
      const lengthOfRewardPos = oc(stampCards[0].displayProperties.rewardPositions)([]).length;
      const intemProgress = {
        stages: lengthOfRewardPos ?
          (lengthOfRewardPos === 1 || lengthOfRewardPos === 2) ?
            (lengthOfRewardPos + 1) : lengthOfRewardPos : 2,
        current: (current !== undefined ? current : (stampCards[0].stamps && stampCards[0].stamps.length) || 0),
        stageLabels: stampCards[0].displayProperties.rewardPositions ?
          ((lengthOfRewardPos === 1 || lengthOfRewardPos === 2) ?
            [0, ...stampCards[0].displayProperties.rewardPositions].sort((a, b) => a - b)
            : [...stampCards[0].displayProperties.rewardPositions].sort((a, b) => a - b)) : // if len is only 1 add 0
          []
      };
      return current ? ({...intemProgress, lightStage: (stampCards[0].stamps && stampCards[0].stamps.length)}) : intemProgress;
    }
    return of({});
  }

  public goToReward(reward: IReward): void {
    this.voucherService.getAll().subscribe(
      (vouchers: Voucher[]) => {
        let navigationExtras: NavigationExtras = {};
        const selectedRewardWithProgress = this.campaignRewards.find(progReward => progReward.id === reward.id);
        if (selectedRewardWithProgress) {
          navigationExtras = {
            state: {
              current: selectedRewardWithProgress.progress.current,
              stageLabels: selectedRewardWithProgress.progress.stageLabels,
              rewardType: this.campaignRewardMode,
              barHeadLine: selectedRewardWithProgress.barHeadLine,
              useRewardDescription: this.campaign.name === 'Getting Started' || this.campaign.name === 'Ultimate Reward',
              enableRedeemButton: selectedRewardWithProgress.meetShowVoucherRequirement
            }
          };
        }
        let voucherId;
        for (const v of vouchers) {
          if (v.reward && v.reward.id === reward.id) {
            voucherId = v.id;
          }
        }
        this.router.navigate(voucherId ?
          [`/reward-voucher-detail/${reward.id}/${voucherId}`] :
          [`/reward-voucher-detail/${reward.id}`]
          , navigationExtras);
      }
    );
  }

}
