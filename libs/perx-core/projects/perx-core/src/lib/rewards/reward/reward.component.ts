import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IPrice, IReward} from '../models/reward.model';

@Component({
  selector: 'perx-core-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  @Input('reward')
  public reward$: Observable<IReward>;

  public ngOnInit(): void {
  }

  public displayPrice(rewardPrice: IPrice): string {
    if (rewardPrice.points > 0 && rewardPrice.price > 0) {
      return `Fast Track: ${rewardPrice.points} points + ${rewardPrice.currencyCode} ${rewardPrice.price}`;
    }

    if (rewardPrice.price > 0) {
      return `${rewardPrice.currencyCode} ${rewardPrice.price}`;
    }

    if (rewardPrice.points > 0) {
      return `${rewardPrice.points} points`;
    }

    return '0 points'; // is actually 0 or invalid value default
  }
}
