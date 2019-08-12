import { Component } from '@angular/core';
import {
  PuzzleCollectStamp,
  PuzzleCollectReward,
  PuzzleCollectStampState
} from '@perx/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  public gameId: number;
  public title: string = 'Scratch & Win!';
  public subTitle: string = 'Collect all 10 stickers and win a reward!';
  public isEnabled: boolean = false;

  // For static stamp card input values
  public stamps: PuzzleCollectStamp[] = [{ id: 1, state: PuzzleCollectStampState.redeemed },
  { id: 2, state: PuzzleCollectStampState.redeemed },
  { id: 3, state: PuzzleCollectStampState.redeemed },
  { id: 3, state: PuzzleCollectStampState.issued }];

  public rewards: PuzzleCollectReward[] = [{ rewardPosition: 0 },
  { rewardPosition: 2 }];

  public congratsDetailText: string = 'You just won 2 rewards';
}
