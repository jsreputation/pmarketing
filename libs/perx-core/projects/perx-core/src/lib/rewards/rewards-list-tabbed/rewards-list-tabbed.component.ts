import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IReward } from '../models/reward.model';
import { map } from 'rxjs/operators';

export interface ITabConfig {
  filterKey?: string;
  filterValue: string;
  tabName: string;
  tabValue: string;
}

@Component({
  selector: 'perx-core-rewards-list-tabbed',
  templateUrl: './rewards-list-tabbed.component.html',
  styleUrls: ['./rewards-list-tabbed.component.scss']
})
export class RewardsListTabbedComponent {
  @Input()
  public rewards?: Observable<IReward[]>;

  @Input()
  public tabs: ITabConfig[] = [
    {
      filterKey: null,
      filterValue: null,
      tabName: 'All Rewards',
      tabValue: null
    }
  ];

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  public selectedIndex: number = 0;

  public filterRewards(tab: ITabConfig): Observable<IReward[]> {
    return this.rewards.pipe(
      map(rewards => tab.filterValue === null || tab.filterKey === null ? rewards : rewards.filter((reward: IReward) => {
          const filterBy = tab.filterKey;
          return reward[`${filterBy}`] &&
            reward[`${filterBy}`].toLowerCase() === tab.filterValue.toLowerCase();
        }
      ))
    );
  }

  // public tabChanged(event: any): void {
  //   console.log(event);
  // }

  public rewardTappedHandler(reward: IReward): void {
    // forward the tapped event
    this.tapped.emit(reward);
  }
}
