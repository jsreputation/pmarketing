import { Component, OnInit, Input } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {

  @Input()
  public rewardId: number;

  @Input()
  public showBackButton: boolean = true;

  @Input()
  public showBannerImage: boolean = true;

  public reward: IReward;

 constructor(
    private location: Location,
    private rewardsService: RewardsService
    ) {}

  public ngOnInit(): void {

    if (this.rewardId) {
      this.rewardsService.getReward(this.rewardId)
      .subscribe((reward: IReward) => {
        this.reward = reward;
      });
    }
  }

  public back(): void {
    this.location.back();
  }
}
