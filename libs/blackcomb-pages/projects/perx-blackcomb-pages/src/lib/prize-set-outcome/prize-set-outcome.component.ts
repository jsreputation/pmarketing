import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {
  filter,
  map,
  switchMap,
  tap,
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
} from '@perxtech/core';
import {
  forkJoin,
  of,
  combineLatest,
  EMPTY,
  Subject
} from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-prize-set-outcome',
  templateUrl: './prize-set-outcome.component.html',
  styleUrls: ['./prize-set-outcome.component.scss']
})
export class PrizeSetOutcomeComponent implements OnInit, OnDestroy {

  public prizeSetId: number;
  public outcomes: IPrizeSetItem[] = [];
  public isLoading: boolean = false;
  public outcomeMsg: string;
  public outcomeType: typeof PrizeSetOutcomeType = PrizeSetOutcomeType;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private activeRoute: ActivatedRoute,
              private loyaltyService: LoyaltyService,
              private rewardsService: RewardsService,
              private prizeSetOutcomeService: IPrizeSetOutcomeService) { }

    public ngOnInit(): void {
      let rewardOutcomes: IPrizeSetItem[] = [];
      let pointOutcomes: IPrizeSetItem[] = [];
      let allOutcomes: IPrizeSetItem[] = [];
      this.activeRoute.paramMap
        .pipe(
          filter((params: ParamMap) => params.has('id')),
          map((params: ParamMap) => params.get('id')),
          switchMap((id: string) => {
            this.isLoading = true;
            this.prizeSetId = Number.parseInt(id, 10);
            return this.prizeSetOutcomeService.getPrizeSetState(this.prizeSetId);
          }),
          switchMap((status: string) => {
            if (status === PrizeSetState.failed) {
              this.outcomeMsg = 'Sorry, outcome issuance failed';
              this.isLoading = false;
            } else if (status === PrizeSetState.inProgress || status === PrizeSetState.queued) {
              this.outcomeMsg = 'Outcome is still processing and will be issued shortly';
              this.isLoading = false;
            }
            return status === 'completed' ? this.prizeSetOutcomeService.getPrizeSet(this.prizeSetId) : EMPTY;
          }),
          tap((outcomes) => {
            allOutcomes = outcomes.filter((outcome) => outcome.state !== 'failed');
            rewardOutcomes = allOutcomes.filter((outcome) => outcome.campaignPrizeType === PrizeSetOutcomeType.reward);
            pointOutcomes = allOutcomes.filter((outcome) => outcome.campaignPrizeType === PrizeSetOutcomeType.points);
          }),
          switchMap(() =>
            forkJoin([
                combineLatest(...rewardOutcomes.map((outcome) => this.rewardsService.getReward(outcome.campaignPrizeId)
                .pipe(catchError(() => of(void 0))))).pipe(startWith([])),
                combineLatest(...pointOutcomes.map((outcome) => this.loyaltyService.getLoyalty(outcome.campaignPrizeId)
                .pipe(catchError(() => of(void 0))))).pipe(startWith([]))]
            )),
            takeUntil(this.destroy$)
          ).subscribe(([rewards, loyalties]: ([IReward[], ILoyalty[]])) => {
            this.isLoading = false;
            allOutcomes.map((outcome) => {
              if (outcome.campaignPrizeType === PrizeSetOutcomeType.reward) {
                outcome.rewardDetails = rewards && rewards.find(r => r?.id === outcome.campaignPrizeId);
              } else if (outcome.campaignPrizeType === PrizeSetOutcomeType.points) {
                outcome.loyaltyDetails = loyalties && loyalties.find(l => l?.id === outcome.campaignPrizeId);
              }
            });
            this.outcomes = allOutcomes;
          });
    }

    public ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}
