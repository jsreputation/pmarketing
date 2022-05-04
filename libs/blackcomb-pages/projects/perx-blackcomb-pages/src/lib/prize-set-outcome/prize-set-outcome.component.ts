import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActivatedRoute, Router
} from '@angular/router';
import { Location } from '@angular/common';
import {
  switchMap,
  catchError,
  startWith,
  takeUntil
} from 'rxjs/operators';
import {
  LoyaltyService,
  IReward,
  IPrizeSetItem,
  RewardsService,
  ILoyalty,
  PrizeSetOutcomeType,
  PrizeSetState,
  IPrizeSetOutcomeService,
  IPrizeSet
} from '@perxtech/core';
import {
  forkJoin,
  of,
  combineLatest,
  Subject,
  iif,
  Observable
} from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-prize-set-outcome',
  templateUrl: './prize-set-outcome.component.html',
  styleUrls: ['./prize-set-outcome.component.scss']
})
export class PrizeSetOutcomeComponent implements OnInit, OnDestroy {

  public transactionId: number;
  public outcomes: IPrizeSetItem[] = [];
  public outcomeType: typeof PrizeSetOutcomeType = PrizeSetOutcomeType;
  public isActualOutcomeMode: boolean = false;
  public repeatGhostCount: number = 1;
  public prizeSet: IPrizeSet;
  private destroy$: Subject<void> = new Subject<void>();
  public prizeSetStatus: string;

  constructor(private activeRoute: ActivatedRoute,
              private location: Location,
              private loyaltyService: LoyaltyService,
              private rewardsService: RewardsService,
              private prizeSetOutcomeService: IPrizeSetOutcomeService,
              private router: Router) { }

    public ngOnInit(): void {
      let prizeSetId: number;
      let transactionId: number;
      combineLatest([this.activeRoute.params, this.activeRoute.queryParams]).pipe(
        switchMap((params) => {
          const id = params.find(param => param.id)?.id;
          if (id) {
            prizeSetId = Number.parseInt(id, 10);
          }
          const queryParam = params.find(param => param.transactionId)?.transactionId;
          if (queryParam) {
              transactionId = Number.parseInt(queryParam, 10);
              this.isActualOutcomeMode = true;
          }
          return forkJoin([this.getPrizeSetOutcome(prizeSetId), iif(() => this.isActualOutcomeMode,
            this.getPrizeSetState(transactionId), of([]))]);
        }),
        takeUntil(this.destroy$)
        ).subscribe(([outcomes, issuedOutcomes]: ([IPrizeSetItem[], IPrizeSetItem[]])) => {
            outcomes?.map((campaignPrizeSet) => {
              const issuedItem = issuedOutcomes?.find(prizeSet => prizeSet?.campaignPrizeId === campaignPrizeSet.campaignPrizeId);
              if (issuedItem) {
                campaignPrizeSet = Object.assign(campaignPrizeSet, issuedItem);
              }
            });
            this.outcomes = outcomes;
        });

    }

    public getPrizeSetOutcome(prizeSetId: number): Observable<IPrizeSetItem[]> {
      let rewardOutcomes: IPrizeSetItem[] = [];
      let pointOutcomes: IPrizeSetItem[] = [];
      let allOutcomes: IPrizeSetItem[] = [];
      return this.prizeSetOutcomeService.getPrizeSetDetails(prizeSetId).pipe(
        switchMap((prizeSet) => {
          this.prizeSet = prizeSet;
          allOutcomes = prizeSet && prizeSet.outcomes;
          rewardOutcomes = allOutcomes.filter((outcome) => outcome.campaignPrizeType === PrizeSetOutcomeType.reward);
          pointOutcomes = allOutcomes.filter((outcome) => outcome.campaignPrizeType === PrizeSetOutcomeType.points);
          return forkJoin([
            combineLatest([...rewardOutcomes.map((outcome) => this.rewardsService.getReward(outcome.campaignPrizeId)
            .pipe(catchError(() => of([]))))]).pipe(startWith([])),
            combineLatest([...pointOutcomes.map((outcome) => this.loyaltyService.getLoyalty(outcome.campaignPrizeId)
            .pipe(catchError(() => of([]))))]).pipe(startWith([]))]);
        }),
        switchMap(([rewards, loyalties]: ([IReward[], ILoyalty[]])) => {
          allOutcomes?.map((outcome) => {
              if (outcome.campaignPrizeType === PrizeSetOutcomeType.reward) {
                outcome.rewardDetails = rewards && rewards.find(reward => reward?.id === outcome.campaignPrizeId);
              } else if (outcome.campaignPrizeType === PrizeSetOutcomeType.points) {
                outcome.loyaltyDetails = loyalties && loyalties.find(loyalty => loyalty?.id === outcome.campaignPrizeId);
              }
            });
          this.outcomes = allOutcomes;
          return of(allOutcomes);
        }));
    }

    public getPrizeSetState(transactionId: number): Observable<IPrizeSetItem[]> {
      return this.prizeSetOutcomeService.getPrizeSetState(transactionId).pipe(
        switchMap((status: string) => {
            this.prizeSetStatus = status;
            return status === PrizeSetState.completed ? this.prizeSetOutcomeService.getPrizeSetIssuedOutcomes(transactionId) : of([]);
          }
        )
      );
    }

    public goToRewardDetails(outcome: IPrizeSetItem): void {
      if (this.isActualOutcomeMode && outcome.actualOutcomeId) {
        this.router.navigate(['/voucher-detail', outcome.actualOutcomeId]);
      } else if (!this.isActualOutcomeMode && outcome.campaignPrizeId) {
        this.router.navigate(['/reward-detail', outcome.campaignPrizeId]);
      }
    }

    public back(): void {
      this.location.back();
    }

    public ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}
