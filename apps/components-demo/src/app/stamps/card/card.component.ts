import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatSlider,
  MatCheckboxChange,
} from '@angular/material';

import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import {
  PuzzleCollectStamp,
  PuzzleCollectStampState,
  PuzzleCollectReward,
} from '@perx/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public stamps: PuzzleCollectStamp[];
  public rewardArr: PuzzleCollectReward[];
  public availStamps: number;
  public stampsRedeemedNumber: number;
  public showCounter: boolean = false;

  @ViewChild('nbStamps', { static: true }) public nbStamps: MatSlider;
  @ViewChild('nbStampsRedeemed', { static: true }) public nbStampsRedeemed: MatSlider;

  private updateRewards(event: MatCheckboxChange): void {
    const sourceIdStr: string = event.source.id;
    const checkboxIdStr: string = sourceIdStr.substr(sourceIdStr.lastIndexOf('-') + 1);
    const rewardPosition: number = +checkboxIdStr;
    if (event.checked) {
      this.rewardArr.push({rewardPosition});
    } else {
      this.rewardArr = this.rewardArr.filter(reward => reward.rewardPosition !== rewardPosition);
    }
  }

  constructor() {
    this.stamps = [];
    this.rewardArr = [];
    this.availStamps = 0;
  }

  public ngOnInit(): void {
    combineLatest(
      this.nbStampsRedeemed.valueChange.pipe(startWith(0)),
      this.nbStamps.valueChange
    )
      .subscribe(([valueRedeemed, valuenbStamps]) => {
        this.stampsRedeemedNumber = valueRedeemed as number;
        this.stamps = Array(valuenbStamps)
          .fill(0)
          .map((_, index) => ({
            id: ++index,
            state: index <= this.stampsRedeemedNumber ? PuzzleCollectStampState.redeemed : PuzzleCollectStampState.issued
          }));
      });
  }

  public checkboxOnChange(event: MatCheckboxChange): void {
    this.updateRewards(event);
  }

  // helper function for rendering # slots using ngFor
  public arrayFromNumber(n: number): any[] {
    return Array(n);
  }

  public toggleShow(): void {
    this.showCounter = !this.showCounter;
  }
}
