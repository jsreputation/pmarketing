import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {IPrice, IReward} from '../models/reward.model';

@Component({
  selector: 'perx-core-rewards-collection',
  templateUrl: './rewards-collection.component.html',
  styleUrls: ['./rewards-collection.component.scss']
})
export class RewardsCollectionComponent implements OnInit {

  public repeatGhostCount: number = 10;

  @Input('rewardsList')
  public rewards$: Observable<IReward[]>;

  @Input()
  public defaultImg: string;

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => string;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  // constructor() {
  // }

  public ngOnInit(): void {
    if (!this.displayPriceFn) {
      this.displayPriceFn = (rewardPrice: IPrice) => {
        if (rewardPrice.price > 0) {
          return `${rewardPrice.currencyCode} ${rewardPrice.price}`;
        }

        if (rewardPrice.points > 0) {
          return `${rewardPrice.points} points`;
        }
        return '0 points'; // is actually 0 or invalid value default
      };
    }
  }

  public rewardClickedHandler(reward: IReward): void {
    this.tapped.emit(reward);
  }
}
