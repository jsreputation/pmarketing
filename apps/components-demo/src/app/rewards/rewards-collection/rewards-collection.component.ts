import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';
import { mock } from '../reward-mock';
import { NotificationService } from '@perx/core';

@Component({
  selector: 'app-rewards-collection',
  templateUrl: './rewards-collection.component.html',
  styleUrls: ['./rewards-collection.component.scss']
})
export class RewardsCollectionComponent implements OnInit {

  public rewards: Observable<IReward[]>;

  constructor(private rewardsService: RewardsService,
              private notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.getRewards();
  }

  public getRewards(): void {
    this.rewardsService.getAllRewards()
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
    });
  }
}
