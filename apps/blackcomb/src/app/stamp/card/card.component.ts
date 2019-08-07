import { Component } from '@angular/core';
import {
  PuzzleCollectStamp,
  PuzzleCollectReward,
  PUZZLE_COLLECT_STAMP_STATE
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
  public stamps: PuzzleCollectStamp[] = [{ id: 1, state: PUZZLE_COLLECT_STAMP_STATE.redeemed },
  { id: 2, state: PUZZLE_COLLECT_STAMP_STATE.redeemed },
  { id: 3, state: PUZZLE_COLLECT_STAMP_STATE.redeemed },
  { id: 3, state: PUZZLE_COLLECT_STAMP_STATE.issued }];

  public rewards: PuzzleCollectReward[] = [{ rewardPosition: 0 },
  { rewardPosition: 2 }];

  public congratsDetailText: string = 'You just won 2 rewards';
}
