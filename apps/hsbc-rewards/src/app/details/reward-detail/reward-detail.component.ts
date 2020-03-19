import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardsService, IReward, IPrice } from '@perxtech/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {
  public reward: Observable<IReward>;
  public displayPriceFn: (price: IPrice) => string;

  public id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rewardService: RewardsService,
  ) { }

  public ngOnInit(): void {
    this.reward = this.route.params.pipe(switchMap((param) => {
      this.id = param.id;
      return this.rewardService.getReward(this.id);
    })).pipe(map((val: IReward) => {
      if (!val.howToRedeem) {
        val.howToRedeem = '<div class="how-to-redeem">Please refer to the <a href="faq">How To Redeem</a> page for instructions.</div>';
      }
      return val;
    }));

    this.displayPriceFn = (rewardPrice: IPrice) => {

      if (rewardPrice.points && rewardPrice.points > 0 && rewardPrice.price && rewardPrice.price > 0) {
        return `Fast Track: ${rewardPrice.points} points + ${rewardPrice.currencyCode} ${Math.floor(rewardPrice.price)}`;
      }

      if (rewardPrice.price && rewardPrice.price > 0) {
        return `${rewardPrice.currencyCode} ${Math.floor(rewardPrice.price)}`;
      }

      if (rewardPrice.points && rewardPrice.points > 0) {
        return `${rewardPrice.points} points`;
      }
      return '0 points'; // is actually 0 or invalid value default
    };
  }
  public moveToBooking(): void {
    this.router.navigate([`/detail/booking/${this.id}`]);
  }

  public displayPrice(rewardPrice: IPrice): string {
    if (rewardPrice.points && rewardPrice.points > 0 && rewardPrice.price && rewardPrice.price > 0) {
      return `Fast Track: ${rewardPrice.points} points + ${rewardPrice.currencyCode} ${rewardPrice.price}`;
    }

    if (rewardPrice.price && rewardPrice.price > 0) {
      return `${rewardPrice.currencyCode} ${rewardPrice.price}`;
    }

    if (rewardPrice.points && rewardPrice.points > 0) {
      return `${rewardPrice.points} points`;
    }

    return '0 points'; // is actually 0 or invalid value default
  }
}
