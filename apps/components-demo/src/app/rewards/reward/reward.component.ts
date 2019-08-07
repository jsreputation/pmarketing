import { Component, Input, OnInit } from '@angular/core';
import { IReward, NotificationService, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';
import { mock } from '../reward-mock';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  public reward: Observable<IReward>;
  public rewardId: number = 8;

  @Input()
  public hideActions: boolean = false;

  constructor(
    private rewardService: RewardsService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.rewardService.getReward(this.rewardId)
      .subscribe(
        (reward) => this.reward = of(reward),
        () => this.reward = of(mock[0])
      );
    this.reward = of(mock[0]);
  }

  public onRedeem(): void {
    this.notificationService.addPopup({
      title: 'Event Triggered',
      text: `${this.rewardId}`
    });
  }

  public onClick(): void {
    this.onRedeem();
  }
}
