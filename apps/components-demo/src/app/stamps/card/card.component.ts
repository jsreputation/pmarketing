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
  public availStamps: number;
  public stampsRedeemedNumber: number;
  public showCounter: boolean = false;
  @ViewChild('nbStamps', { static: true }) public nbStamps: MatSlider;
  @ViewChild('nbStampsRedeemed', { static: true }) public nbStampsRedeemed: MatSlider;
  @ViewChildren(MatCheckbox) public matCheckboxes: QueryList<MatCheckbox>;

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

  public ngAfterViewInit(): void {
    this.matCheckboxes.forEach((matbox: MatCheckbox) => {
      if ((matbox.name) === 'toggler') {
        return;
      }
      matbox.change.subscribe((value) => {
        const sourceIdStr = value.source.id;
        const checkboxStr = sourceIdStr.substr(sourceIdStr.lastIndexOf('-') + 1);
        const checkboxId: number = +checkboxStr - 1;
        if (value.checked) {
          this.rewardArr.push({ rewardPosition: checkboxId - 1});
        } else {
          this.rewardArr = this.rewardArr.filter(reward => reward.rewardPosition !== checkboxId - 1);
        }
      });
    });
  }
  // helper function for rendering # slots using ngFor
  public arrayFromNumber(n: number): any[] {
    return Array(n);
  }

  public toggleShow(): void {
    this.showCounter = !this.showCounter;
  }
}
