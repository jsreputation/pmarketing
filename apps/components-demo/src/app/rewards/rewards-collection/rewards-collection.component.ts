import { Component, OnDestroy, OnInit } from '@angular/core';
import { IReward, PopupComponent, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';
import { mock } from '../reward-mock';
import { NotificationService } from '@perx/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-rewards-collection',
  templateUrl: './rewards-collection.component.html',
  styleUrls: ['./rewards-collection.component.scss']
})
export class RewardsCollectionComponent implements OnInit, OnDestroy {

  public rewards: Observable<IReward[]>;

  constructor(private rewardsService: RewardsService,
              private dialog: MatDialog,
              private notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });
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
      afterClosedCallBack: this
    });
  }

  public dialogClosed(): void {

  }
}
