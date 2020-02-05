import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RewardsService, IReward, PopupComponent } from '@perx/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public title: string = 'Headline';
  public subTitle: string = 'Sub-Headline';

  public rewards$: Observable<IReward[]>;

  constructor(
    private rewardsService: RewardsService,
    private dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.getRewards();
  }

  public getRewards(): void {
    this.rewards$ = this.rewardsService.getAllRewards();
  }

  public rewardClickedHandler(reward: IReward): void {
    const data = {
      title: 'Clicked!',
      text: `ID: ${  reward.id  }\n` +
        `Reward Name: ${  reward.name}`,
    };
    this.dialog.open(PopupComponent, { data });
  }
}
