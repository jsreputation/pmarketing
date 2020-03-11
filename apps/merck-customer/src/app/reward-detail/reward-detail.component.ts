import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';

import { Router, ActivatedRoute } from '@angular/router';
import { IReward, RewardsService } from '@perxtech/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit, PageAppearence {
  public reward: Observable<IReward>;
  public rewardId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rewardService: RewardsService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const stringId: string | null = params.get('rewardId');
      if (stringId) {
        this.rewardId = parseInt(stringId, 10);
        this.getReward();
      }
    });
  }

  private getReward(): void {
    this.reward = this.rewardService.getReward(this.rewardId);
  }

  public onClick(): void {
    this.router.navigateByUrl(`redeem/${this.rewardId}`);
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.NONE,
      pageTitle: ''
    };
  }
}
