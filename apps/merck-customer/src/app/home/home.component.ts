import { Component } from '@angular/core';
import { PageProperties, BarSelectedItem } from '../page-properties';
import { IReward, RewardsService } from '@perx/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements PageProperties {

  public rewards: Observable<IReward[]>;

  public constructor(
    private rewardsService: RewardsService,
    private router: Router

  ) {
    this.rewards = this.rewardsService.getAllRewards();
  }

  public myQrClicked(): void {
    console.log('My Qr clicked');
  }

  public rewardClicked(reward: IReward): void {
    this.router.navigateByUrl(`reward-detail/${reward.id}`);
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
