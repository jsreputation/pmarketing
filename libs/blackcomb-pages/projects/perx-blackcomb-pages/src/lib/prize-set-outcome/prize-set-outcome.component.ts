import { Component, OnInit } from '@angular/core';
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
  startWith
} from 'rxjs/operators';
import {
  ICampaignService,
  LoyaltyService,
  IReward,
  IPrizeSetItem,
  RewardsService,
  ILoyalty,
  PrizeSetOutcomeType
} from '@perxtech/core';
import {
  forkJoin,
  of,
  combineLatest,
} from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-prize-set-outcome',
  templateUrl: './prize-set-outcome.component.html',
  styleUrls: ['./prize-set-outcome.component.scss']
})
export class PrizeSetOutcomeComponent implements OnInit {

  public prizeSetId: number;
  public outcomes: IPrizeSetItem[] = [];

  constructor(private activeRoute: ActivatedRoute,
              private campaignService: ICampaignService,
              private loyaltyService: LoyaltyService,
              private rewardsService: RewardsService) { }

    public ngOnInit(): void {
      let rewardOutcomes: IPrizeSetItem[] = [];
      let pointOutcomes: IPrizeSetItem[] = [];
      let allOutcomes: IPrizeSetItem[] = [];
      this.activeRoute.paramMap
        .pipe(
          filter((params: ParamMap) => params.has('id')),
          map((params: ParamMap) => params.get('id')),
          switchMap((id: string) => {
            this.prizeSetId = Number.parseInt(id, 10);
            return this.campaignService.getPrizeSet(this.prizeSetId);
          }),
          tap((outcomes) => {
            allOutcomes = outcomes;
            rewardOutcomes = outcomes.filter((outcome) => outcome.actualOutcomeType === PrizeSetOutcomeType.reward);
            pointOutcomes = outcomes.filter((outcome) => outcome.actualOutcomeType === PrizeSetOutcomeType.points);
          }),
          switchMap(() =>
            forkJoin([
                combineLatest(...rewardOutcomes.map((outcome) => this.rewardsService.getReward(outcome.actualOutcomeId)
                .pipe(catchError(() => of(void 0))))).pipe(startWith([])),
                combineLatest(...pointOutcomes.map((outcome) => this.loyaltyService.getLoyalty(outcome.actualOutcomeId)
                .pipe(catchError(() => of(void 0))))).pipe(startWith([]))]
            ))
          ).subscribe(([rewards, loyalties]: ([IReward[], ILoyalty[]])) => {
            allOutcomes.map((outcome) => {
              if (outcome.actualOutcomeType === 'Reward::Campaign') {
                outcome.rewardDetails = rewards && rewards.find(r => r?.id === outcome.actualOutcomeId);
              } else if (outcome.actualOutcomeType === 'StoredValue::Campaign') {
                outcome.loyaltyDetails = loyalties && loyalties.find(l => l?.id === outcome.actualOutcomeId);
              }
            });
            this.outcomes = allOutcomes;
          });
    }

}
