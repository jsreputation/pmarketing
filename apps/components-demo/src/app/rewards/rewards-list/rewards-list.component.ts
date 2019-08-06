import { Component, OnDestroy, OnInit } from '@angular/core';
import { IReward, NotificationService, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';
import { mock } from '../reward-mock';

@Component({
  selector: 'app-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss']
})
export class RewardsListComponent implements OnInit, OnDestroy {

  public rewards: Observable<IReward[]>;

  constructor(private rewardsService: RewardsService,
              private notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.rewardsService
      .getAllRewards()
      .subscribe(
        (rewards) => this.rewards = of(rewards),
        () => this.rewards = of(mock)
      );
  }

  public rewardClickedHandler(reward: IReward): void {
    this.notificationService.addPopup({
      title: 'Clicked!',
      text: 'ID: ' + reward.id + '\n' +
        'Reward Name: ' + reward.name,
      afterClosedCallBack: this
    });
  }

  public dialogClosed(): void {

  }
}
