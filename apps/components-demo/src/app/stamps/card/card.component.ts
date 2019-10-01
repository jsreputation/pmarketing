import { combineLatest } from 'rxjs';
import { MatSlider } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PuzzleCollectStamp, PuzzleCollectStampState, PuzzleCollectReward } from '@perx/core';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public stamps: PuzzleCollectStamp[];
  public rewardArr: PuzzleCollectReward[];
  public stampsRedeemedNumber: number;
  @ViewChild('nbSlots', { static: true }) public nbSlots: MatSlider;
  @ViewChild('nbStamps', { static: true }) public nbStamps: MatSlider;
  @ViewChild('nbStampsRedeemed', { static: true }) public nbStampsRedeemed: MatSlider;
  @ViewChild('cbContainer', { static: true, read: ElementRef }) public cbContainer: ElementRef;

  constructor() {
    this.stamps = [];
    this.rewardArr = [];
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
  // helper function for rendering # slots using ngFor
  public arrayFromNumber(n: number): any[] {
    return Array(n);
  }

  public addReward(_: Event, clickedIndex: number): void {
    // to convert nodeList to an array such that forEach can be used to loop over each child
    [...this.cbContainer.nativeElement.children]
      .forEach((child, childIndex) => {
        // if already checked, will return true, so need to negate
        if (!child.classList.contains('mat-checkbox-checked') && clickedIndex === childIndex) {
          this.rewardArr.push({ rewardPosition: clickedIndex });
        } else if (child.classList.contains('mat-checkbox-checked') && clickedIndex === childIndex) {
          this.rewardArr = this.rewardArr.filter(reward => reward.rewardPosition !== clickedIndex);
        }
      });
  }
}
