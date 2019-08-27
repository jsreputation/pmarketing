import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {IPrice, IReward} from '../models/reward.model';

@Component({
  selector: 'perx-core-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss']
})
export class RewardsListComponent implements OnInit {

  public repeatGhostCount: number = 10;

  @Input('rewardsList')
  public rewards$: Observable<IReward[]>;

  @Input()
  public defaultImg: string;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  // constructor() {
  // }

  public ngOnInit(): void {
  }

  public rewardClickedHandler(reward: IReward): void {
    this.tapped.emit(reward);
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
