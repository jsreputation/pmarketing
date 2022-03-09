import { Component, OnInit } from '@angular/core';
import {
  IGameOutcome,
  ILoyalty,
  IPrizeSet,
  IPrizeSetItem,
  IPrizeSetOutcomeService,
  IReward,
  LoyaltyService,
  PrizeSetOutcomeType,
  PrizeSetState,
  RewardsService,
  Voucher
} from '@perxtech/core';
import { AnalyticsService, PageType } from '../analytics.service';
import { GameOutcomeService } from './game-outcome/game-outcome.service';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, iif, Observable, of } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  public vouchers: Voucher[];
  public prizeSet: IPrizeSet;
  public prizeSetStatus: string;
  public prizeSetOutcomes: IPrizeSetItem[] = [];
  public outcomeType: typeof PrizeSetOutcomeType = PrizeSetOutcomeType;

  constructor(
    private analytics: AnalyticsService,
    private gameOutcomeService: GameOutcomeService,
    private prizeSetOutcomeService: IPrizeSetOutcomeService,
    private loyaltyService: LoyaltyService,
    private rewardsService: RewardsService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.vouchers = this.gameOutcomeService.getVouchersRewarded();
    if (! (this.vouchers && this.vouchers.length > 0)) {
      of(this.gameOutcomeService.getPrizeSetOutcome()).pipe(
        switchMap((prizeSetOutcome) =>
          iif(() => prizeSetOutcome !== undefined || prizeSetOutcome !== null,
            forkJoin([
              this.getPrizeSetOutcome(prizeSetOutcome!.prizeSetId),
              this.getPrizeSetState(prizeSetOutcome!.transactionId)
            ]),
            of([]),
          ))
      ).subscribe(
        ([ prizeSetItems, issuedOutcomes ]) => {
          prizeSetItems?.map((campaignPrizeSet) => {
            const issuedItem = issuedOutcomes?.find(prizeSet => prizeSet?.campaignPrizeId === campaignPrizeSet.campaignPrizeId);
            if (issuedItem) {
              campaignPrizeSet = Object.assign(campaignPrizeSet, issuedItem);
            }
          });
          this.prizeSetOutcomes = prizeSetItems;
        }
      );
    }

    this.analytics.addEvent({
      pageName: 'rewards:game:congrats',
      pageType: PageType.static,
      siteSectionLevel2: 'rewards:game',
      siteSectionLevel3: 'rewards:game:congrats'
    });
  }

  public navigateToRewards(): void {
    this.gameOutcomeService.clearVoucherList();
    this.router.navigateByUrl('/home/vouchers');
  }

  public getOutcome(): IGameOutcome {
    return this.gameOutcomeService.getOutcome();
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
        this.prizeSetOutcomes = allOutcomes;
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
}
