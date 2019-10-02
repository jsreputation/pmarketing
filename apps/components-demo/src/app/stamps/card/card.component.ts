import { combineLatest } from 'rxjs';
import { MatSlider, MatCheckbox } from '@angular/material';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { PuzzleCollectStamp, PuzzleCollectStampState, PuzzleCollectReward } from '@perx/core';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  public stamps: PuzzleCollectStamp[];
  public rewardArr: PuzzleCollectReward[];
  public stampsRedeemedNumber: number;
  @ViewChild('nbStamps', { static: true }) public nbStamps: MatSlider;
  @ViewChild('nbStampsRedeemed', { static: true }) public nbStampsRedeemed: MatSlider;
  @ViewChildren(MatCheckbox) public matCheckboxes: QueryList<MatCheckbox>;

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

  public ngAfterViewInit(): void {
    this.matCheckboxes.forEach((matbox: MatCheckbox) => {
      matbox.change.subscribe((value) => {
        const sourceIdStr = value.source.id;
        const numId = sourceIdStr.substr(sourceIdStr.lastIndexOf('-') + 1);
        if (value.checked) {
          this.rewardArr.push({ rewardPosition: +numId - 1});
        } else {
          this.rewardArr = this.rewardArr.filter(reward => reward.rewardPosition !== +numId - 1);
        }
      });
    });
  }
  // helper function for rendering # slots using ngFor
  public arrayFromNumber(n: number): any[] {
    return Array(n);
  }
}
