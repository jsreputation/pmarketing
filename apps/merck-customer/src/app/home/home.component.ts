import { Component } from '@angular/core';
import { PageProperties, BarSelectedItem } from '../page-properties';
import { IReward, RewardsService } from '@perx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements PageProperties {

  public rewards: Observable<IReward[]>;

  public constructor(
    private rewardsService: RewardsService
  ) {
    this.rewards = this.rewardsService.getAllRewards();
  }

  public myQrClicked(): void {
    console.log('My Qr clicked');
  }

  public rewardClicked(reward: IReward): void {
    // TODO: Currentlu tapped event is not being emmited from perx core.
    // Navigate to Reward Detail once tapped events are active.
    console.log(reward);
  }

  public showHeader(): boolean {
    return true;
  }

  public bottomSelectedItem(): BarSelectedItem {
    return BarSelectedItem.HOME;
  }
}
