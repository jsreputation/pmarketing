import { Component, Output, EventEmitter } from '@angular/core';
import { IReward } from '@perx/core';

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
    this.rewards = [
      {
        id: 1,
        name: 'Get a Free Coke',
        description: 'string',
        subtitle: 'string',
        validFrom: new Date(),
        validTo: new Date(),
        rewardThumbnail: 'https://picsum.photos/300/200?random=1',
        rewardBanner: 'https://picsum.photos/300/200?random=1',
        merchantImg: 'https://picsum.photos/300/200?random=1',
        merchantName: 'Pizza Hut',
        termsAndConditions: 'string',
        howToRedeem: 'string',
      },
      {
        id: 1,
        name: '1 for 1',
        description: 'string',
        subtitle: 'string',
        validFrom: new Date(),
        validTo: new Date(),
        rewardThumbnail: 'https://picsum.photos/300/200?random=2',
        rewardBanner: 'https://picsum.photos/300/200?random=2',
        merchantImg: 'https://picsum.photos/300/200?random=2',
        merchantName: 'Starbucks',
        termsAndConditions: 'string',
        howToRedeem: 'string',
      }
    ];
  }

  public selected(reward: IReward): void {
    this.tapped.emit(reward);
  }
}
