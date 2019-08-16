import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { IReward, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, PageAppearence {

  public rewards: Observable<IReward[]>;

  public constructor(
    private rewardsService: RewardsService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.rewardsService
      .getAllRewards()
      .subscribe(
        (rewards) => this.rewards = of(rewards)
      );
  }

  public myQrClicked(): void {
    this.router.navigateByUrl('redeem');
  }

  public rewardClicked(reward: IReward): void {
    this.router.navigateByUrl(`reward-detail/${ reward.id }`);
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: false,
      bottomSelectedItem: BarSelectedItem.HOME,
      pageTitle: ''
    };
  }
}
