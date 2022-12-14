import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPrice, IReward } from '../models/reward.model';
import { map } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';

export interface ITabConfig {
  filterKey: string | null;
  filterValue: string | null;
  tabName: string;
  rewardsList?: Observable<IReward[]> | null;
  merchantNames?: string[];
  rewardNames?: string[];
}

export interface ITabConfigExtended extends ITabConfig {
  rewardsType: string | null;
  currentPage?: number | null;
  completePagination?: boolean;
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
      // rewardsList: null
    }
  ]);

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => Observable<string>;

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
        if (rewardPrice.price && parseFloat(rewardPrice.price) > 0) {
          if (rewardPrice.points && rewardPrice.points > 0) {
            return of(`${rewardPrice.currencyCode} ${rewardPrice.price} and ${rewardPrice.points} points`);
          }
          return of(`${rewardPrice.currencyCode} ${rewardPrice.price}`);
        }

        if (rewardPrice.points && rewardPrice.points > 0) {
          return of(`${rewardPrice.points} points`);
        }
        return of(''); // is actually 0 or invalid value default
      };
    }
  }

  public filterRewards(tab: ITabConfig): Observable<IReward[]> {
    const rewardsList = tab.rewardsList || this.rewards;
    if (!rewardsList) {
      throw new Error('Rewards list is empty. Provide a list using [rewards] or [tabs]');
    }

    return rewardsList.pipe(
      map(rewards => {
        if (tab.filterValue === null || tab.filterKey === null) {
          return rewards;
        }
        const filterValue: string = tab.filterValue.toLowerCase();
        const filterBy: string = tab.filterKey;
        return rewards.filter((reward: IReward) => reward[filterBy] && reward[filterBy].toLowerCase() === filterValue);
      })
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
