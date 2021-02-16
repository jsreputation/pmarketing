import { Component, OnInit } from '@angular/core';
import { IPrice, IReward, RewardsService } from '@perxtech/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-favorite-rewards',
  templateUrl: './favorite-rewards.component.html',
  styleUrls: ['./favorite-rewards.component.scss']
})
export class FavoriteRewardsComponent implements OnInit {

  public rewardsList$: Observable<IReward[]>;

  constructor(
    private router: Router,
    private rewardsService: RewardsService
  ) { }

  public ngOnInit(): void {
    this.rewardsList$ = this.rewardsService.getAllFavoriteRewards().pipe();
  }

  public displayPriceFn: (rewardPrice: IPrice) => Observable<string> = (
    rewardPrice: IPrice,
  ) => {
    if (rewardPrice.price && parseFloat(rewardPrice.price) > 0) {
      if (rewardPrice.points && rewardPrice.points > 0) {
        return of(
          `${rewardPrice.currencyCode} ${rewardPrice.price} and ${rewardPrice.points} points`,
        );
      }
      return of(`${rewardPrice.currencyCode} ${rewardPrice.price}`);
    }

    if (rewardPrice.points && rewardPrice.points > 0) {
      return of(`${rewardPrice.points} points`);
    }
    return of(''); // is actually 0 or invalid value default
  }

  public goToReward(reward: IReward): void {
    this.router.navigate(['/reward-detail', reward.id]);
  }
}
