import { Component, OnInit } from '@angular/core';
import { PageProperties, BarSelectedItem } from '../page-properties';
import { Router, ActivatedRoute } from '@angular/router';
import { IReward, RewardsService } from '@perx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit, PageProperties {
  public reward: Observable<IReward>;
  public rewardId: number;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private rewardService: RewardsService
              ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('rewardId')) {
        this.rewardId = +params.get('rewardId');
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

  public showHeader(): boolean {
    return true;
  }

  public bottomSelectedItem(): BarSelectedItem {
    return BarSelectedItem.NONE;
  }

  public backButtonEnabled(): boolean {
    return true;
  }
}
