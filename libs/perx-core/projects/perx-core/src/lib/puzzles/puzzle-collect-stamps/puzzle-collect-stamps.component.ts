import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PuzzleCollectStamp, PuzzleCollectReward, STAMP_STATE } from '../models/puzzle-stamp.model';

@Component({
  selector: 'perx-core-puzzle-collect-stamps',
  templateUrl: './puzzle-collect-stamps.component.html',
  styleUrls: ['./puzzle-collect-stamps.component.css']
})

export class PuzzleCollectStampsComponent implements OnInit {

  // This dummy array is describing the slots templates
  stampsOrientations = [[1, 2],
                        [2, 2],
                        [2, 1, 2],
                        [3, 3],
                        [3, 3, 1],
                        [4, 4],
                        [3, 3, 3],
                        [3, 3, 3, 1]];

  @Input()
  stamps: PuzzleCollectStamp[] = null;

  @Input()
  rewards: PuzzleCollectReward[] = null;

  @Input()
  nbSlots: number = null;

  @Input()
  preStampImg: string = null;

  @Input()
  postStampImg: string = null;

  @Input()
  rewardPreStamp: string = null;

  @Input()
  rewardPostStamp: string = null;

  @Output()
  availableStampClicked = new EventEmitter<PuzzleCollectStamp>();

  currentActiveOrientation: number[] = null;

  constructor() { }

  ngOnInit() {
    this.currentActiveOrientation = this.stampsOrientations[this.nbSlots - 3];
  }

  counter(i: number) {
    return new Array(i);
  }

  isIndexPresentInRewards(index: number): boolean {
    let isPresent = false;
    this.rewards.forEach(element => {
      if (element.rewardPosition === index) {
        isPresent = true;
      }
    });
    return isPresent;
  }

  getStampImage(index: number, rowNum: number): string {

    const itemIndex = this.getItemIndex(index, rowNum);

    if (itemIndex < (this.stamps.length)) {
      if (this.stamps[itemIndex].state === STAMP_STATE.redeemed) {
        if (this.isIndexPresentInRewards(itemIndex)) {
          return this.rewardPostStamp;
        } else {
          return this.postStampImg;
        }
      } else { // Issued
        if (this.isIndexPresentInRewards(itemIndex)) {
          return this.rewardPreStamp;
        } else {
          return this.rewardPreStamp;
        }
      }
    }
    return this.preStampImg;
  }

  isIssued(index: number, rowNum: number): boolean {
    const itemIndex = this.getItemIndex(index, rowNum);
    if (itemIndex < this.stamps.length) {
      return this.stamps[itemIndex].state === STAMP_STATE.issued;
    }
    return false;
  }

  onAvailableStampClicked(index: number, rowNum: number) {
    const itemIndex = this.getItemIndex(index, rowNum);
    if (itemIndex < this.stamps.length) {
      this.stamps[itemIndex].state = STAMP_STATE.redeemed;
      this.availableStampClicked.emit(this.stamps[itemIndex]);
    }
  }

  getItemIndex(index: number, rowNum: number): number {
    let itemIndex = index;
    for (let i = 0; i < this.currentActiveOrientation.length; i++) {
      if (rowNum > i) {
        itemIndex += this.currentActiveOrientation[i];
      }
    }
    return itemIndex;
  }

}
