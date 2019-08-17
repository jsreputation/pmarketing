import { Component, Output, EventEmitter } from '@angular/core';
import { IReward } from '@perx/core';
import { rewards } from '../../rewards.mock';

@Component({
  selector: 'app-rewards-cards',
  templateUrl: './rewards-cards.component.html',
  styleUrls: ['./rewards-cards.component.scss']
})
export class RewardsCardsComponent {
  public rewards: IReward[];
  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  constructor() {
    this.rewards = rewards;
  }

  public selected(reward: IReward): void {
    this.tapped.emit(reward);
  }
}
