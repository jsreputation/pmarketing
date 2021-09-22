import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { combineLatest, forkJoin, iif, Observable, of, Subject } from 'rxjs';
import {
  IInstantOutcome,
  IInstantOutcomeTransaction,
  IInstantOutcomeTransactionService,
  ILoyalty, InstantOutcomeCampaignPrizeType, InstantOutcomeTransactionState,
  IReward,
  LoyaltyService,
  RewardsService
} from '@perxtech/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, startWith, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-instant-reward-outcome',
  templateUrl: './instant-reward-outcome.component.html',
  styleUrls: ['./instant-reward-outcome.component.scss'],
})
export class InstantRewardOutcomeComponent implements OnInit, OnDestroy {
  public transactionId: number;
  public outcomes: IInstantOutcome[] = [];
  public outcomeType: typeof InstantOutcomeCampaignPrizeType = InstantOutcomeCampaignPrizeType;
  public isActualOutcomeMode: boolean = false;
  public repeatGhostCount: number = 1;
  public transaction: IInstantOutcomeTransaction;
  private destroy$: Subject<void> = new Subject<void>();
  public instantRewardStatus: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private loyaltyService: LoyaltyService,
    private rewardsService: RewardsService,
    private instantOutcomeTransactionService: IInstantOutcomeTransactionService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    let transactionId: number;
    combineLatest([this.activeRoute.params, this.activeRoute.queryParams])
      .pipe(
        switchMap((params) => {
          const id = params.find((param) => param.id)?.id;
          if (id) {
            transactionId = Number.parseInt(id, 10);
          }
          this.isActualOutcomeMode = true;
          return iif(
            () => this.isActualOutcomeMode,
            this.getTransactionState(transactionId),
            of([])
          );
        }),
        switchMap((outcomes) => forkJoin([
            this.getOutcomes(transactionId),
            of(outcomes),
          ])),
        takeUntil(this.destroy$)
      )
      .subscribe(
        ([outcomes, issuedOutcomes]: [IInstantOutcome[], IInstantOutcome[]]) => {
          outcomes?.map((outcomeItem) => {
            const issuedOutcome = issuedOutcomes?.find(
              (issuedOutcomeItem) =>
                issuedOutcomeItem?.campaignPrizeId === outcomeItem.campaignPrizeId
            );
            if (issuedOutcome) {
              outcomeItem = Object.assign(outcomeItem, issuedOutcome);
            }
          });
          this.outcomes = outcomes;
        }
      );
  }

  public getOutcomes(transactionId: number): Observable<IInstantOutcome[]> {
    let rewardOutcomes: IInstantOutcome[] = [];
    let pointOutcomes: IInstantOutcome[] = [];
    let allOutcomes: IInstantOutcome[] = [];
    return this.instantOutcomeTransactionService
      .getInstantOutcomeTransaction(transactionId)
      .pipe(
        switchMap((instantOutcomeTransaction) => {
          this.transaction = instantOutcomeTransaction;
          allOutcomes =
            instantOutcomeTransaction && instantOutcomeTransaction.outcomes;
          rewardOutcomes = allOutcomes.filter(
            (outcome) =>
              outcome.campaignPrizeType ===
              InstantOutcomeCampaignPrizeType.reward
          );
          pointOutcomes = allOutcomes.filter(
            (outcome) =>
              outcome.campaignPrizeType ===
              InstantOutcomeCampaignPrizeType.points
          );
          return forkJoin([
            combineLatest([
              ...rewardOutcomes.map((outcome) =>
                this.rewardsService
                  .getReward(outcome.campaignPrizeId)
                  .pipe(catchError(() => of([])))
              ),
            ]).pipe(startWith([])),
            combineLatest([
              ...pointOutcomes.map((outcome) =>
                this.loyaltyService
                  .getLoyalty(outcome.campaignPrizeId)
                  .pipe(catchError(() => of([])))
              ),
            ]).pipe(startWith([])),
          ]);
        }),
        switchMap(([rewards, loyalties]: [IReward[], ILoyalty[]]) => {
          allOutcomes?.map((outcome) => {
            if (
              outcome.campaignPrizeType ===
              InstantOutcomeCampaignPrizeType.reward
            ) {
              outcome.rewardDetails =
                rewards &&
                rewards.find(
                  (reward) => reward?.id === outcome.campaignPrizeId
                );
            } else if (
              outcome.campaignPrizeType ===
              InstantOutcomeCampaignPrizeType.points
            ) {
              outcome.loyaltyDetails =
                loyalties &&
                loyalties.find(
                  (loyalty) => loyalty?.id === outcome.campaignPrizeId
                );
            }
          });
          this.outcomes = allOutcomes;
          return of(allOutcomes);
        })
      );
  }

  public getTransactionState(
    transactionId: number
  ): Observable<IInstantOutcome[]> {
    return this.instantOutcomeTransactionService
      .getInstantRewardState(transactionId)
      .pipe(
        switchMap((status: string) => {
          this.instantRewardStatus = status;
          return status === InstantOutcomeTransactionState.completed || status === InstantOutcomeTransactionState.redeemed
            ? this.instantOutcomeTransactionService.getInstantOutcomeTransactionOutcomes(
                transactionId
              )
            : of([]);
        })
      );
  }

  public goToRewardDetails(outcome: IInstantOutcome): void {
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
