import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IPrice, IReward} from '../models/reward.model';
import {map} from 'rxjs/operators';
import {MatTabChangeEvent} from '@angular/material';

export interface ITabConfig {
  filterKey?: string;
  filterValue: string;
  tabName: string;
  rewardsList?: Observable<IReward[]>;
}

@Component({
  selector: 'perx-core-rewards-list-tabbed',
  templateUrl: './rewards-list-tabbed.component.html',
  styleUrls: ['./rewards-list-tabbed.component.scss']
})
export class RewardsListTabbedComponent implements OnInit {
  @Input()
  public rewards?: Observable<IReward[]>;

  @Input()
  public tabs$: Observable<ITabConfig[]> = of([
    {
      filterKey: null,
      filterValue: null,
      tabName: 'All Rewards',
      rewardsList: null
    }
  ]);

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => string;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();
  @Output()
  public tabChanged: EventEmitter<MatTabChangeEvent> = new EventEmitter<MatTabChangeEvent>();

  public selectedIndex: number = 0;

  public ngOnInit(): void {
    /**
     * todo: check if list exists in this.tabs, and if this.rewards also has an input,
     * throw warning that this.rewards is ignored
     */
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

  public filterRewards(tab: ITabConfig): Observable<IReward[]> {
    const rewardsList = tab.rewardsList || this.rewards;
    if (!rewardsList) {
      throw new Error('Rewards list is empty. Provide a list using [rewards] or [tabs]');
    }

    return rewardsList.pipe(
      map(rewards => tab.filterValue === null || tab.filterKey === null ? rewards : rewards.filter((reward: IReward) => {
          const filterBy = tab.filterKey;
          return reward[`${filterBy}`] &&
            reward[`${filterBy}`].toLowerCase() === tab.filterValue.toLowerCase();
        }
      ))
    );
  }

  public tabChangedHandler(event: MatTabChangeEvent): void {
    this.tabChanged.emit(event);
  }

  public rewardTappedHandler(reward: IReward): void {
    // forward the tapped event
    this.tapped.emit(reward);
  }
}
