import { Component, OnInit } from '@angular/core';
import { PageProperties, BarSelectedItem } from '../page-properties';
import { IReward, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements PageProperties, OnInit {

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
    console.log('My Qr clicked');
  }

  public rewardClicked(reward: IReward): void {
    this.router.navigateByUrl(`reward-detail/${ reward.id }`);
  }

  public showHeader(): boolean {
    return true;
  }

  public bottomSelectedItem(): BarSelectedItem {
    return BarSelectedItem.HOME;
  }

  public backButtonEnabled(): boolean {
    return false;
  }

}
