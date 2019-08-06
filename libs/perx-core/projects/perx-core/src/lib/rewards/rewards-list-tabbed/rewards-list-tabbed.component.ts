import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IReward } from '../models/reward.model';
import { map } from 'rxjs/operators';

export interface ITabConfig {
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
      tabName: 'All Rewards',
      tabValue: null
    },
    {
      tabName: 'HSBC',
      tabValue: 'hsbc'
    }
  ];

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  public selectedIndex: number = 0;

  public filterRewardsByMerchantName(value: string): Observable<IReward[]> {
    return this.rewards.pipe(
      map(rewards => value === null ? rewards : rewards.filter((reward: IReward) => {
          return reward.merchantName &&
            reward.merchantName.toLowerCase() === value.toLowerCase();
        }
      ))
    );
  }

  public tabChanged(event: any): void {
    console.log(event);
  }

  public rewardTappedHandler(reward: IReward): void {
    // forward the tapped event
    this.tapped.emit(reward);
  }
}
