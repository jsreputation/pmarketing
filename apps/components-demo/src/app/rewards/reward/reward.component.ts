import { Component, Input, OnInit } from '@angular/core';
import { IReward, NotificationService, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { mock } from '../reward-mock';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  reward: Observable<IReward>;
  rewardId = 8;

  @Input()
  public hideActions = false;

  constructor(
    private rewardService: RewardsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.reward = this.rewardService.getReward(this.rewardId)
      .pipe(catchError(() => of(mock[0])));
  }

  onRedeem() {
    this.notificationService.addPopup({
      title: 'Event Triggered',
      text: `${this.rewardId}`
    });
  }

  public onClick(): void {
    this.onRedeem();
  }
}
