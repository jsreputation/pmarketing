import {Component, OnInit} from '@angular/core';
import {IReward, NotificationService, RewardsService, ITabConfig} from '@perx/core';
import {of, Subject} from 'rxjs';
import {mock} from '../reward-mock';

@Component({
  selector: 'app-rewards-list-tabbed',
  templateUrl: './rewards-list-tabbed.component.html',
  styleUrls: ['./rewards-list-tabbed.component.scss']
})
export class RewardsListTabbedComponent implements OnInit {
  public tabs$: Subject<ITabConfig[]> = new Subject<ITabConfig[]>();
  public tabs: ITabConfig[];

  constructor(private rewardsService: RewardsService,
              private notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.getRewards();
    this.tabs = [{
      filterKey: null,
      filterValue: null,
      tabName: 'All Rewards',
      rewardsList: null
    }, {
      filterKey: null,
      filterValue: null,
      tabName: 'Lifestyle',
      rewardsList: null
    }
    ];
  }

  public getRewards(): void {
    this.rewardsService.getAllRewards()
      .subscribe(
        (rewards: IReward[]) => {
          this.tabs[0].rewardsList = of(rewards);
          this.tabs$.next(this.tabs);
        },
        () => this.tabs.push({
          filterKey: null,
          filterValue: null,
          tabName: 'All Rewards',
          rewardsList: of(mock)
        })
      );

    this.rewardsService.getAllRewards(null, ['Lifestyle'])
      .subscribe(
        (rewards: IReward[]) => {
          this.tabs[1].rewardsList = of(rewards);
          this.tabs$.next(this.tabs);

        },
        () => this.tabs.push({
          filterKey: null,
          filterValue: null,
          tabName: 'Lifestyle',
          rewardsList: of(mock)
        })
      );
  }

  public rewardClickedHandler(reward: IReward): void {
    this.notificationService.addPopup({
      title: 'Clicked!',
      text: 'ID: ' + reward.id + '\n' +
        'Reward Name: ' + reward.name,
    });
  }
}
