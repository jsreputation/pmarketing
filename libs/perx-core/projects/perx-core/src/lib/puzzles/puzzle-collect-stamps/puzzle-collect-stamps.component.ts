import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PuzzleCollectStamp, PuzzleCollectReward, PuzzleCollectStampState } from '../models/puzzle-stamp.model';

@Component({
  selector: 'perx-core-puzzle-collect-stamps',
  templateUrl: './puzzle-collect-stamps.component.html',
  styleUrls: ['./puzzle-collect-stamps.component.css']
})

export class PuzzleCollectStampsComponent implements OnChanges {
  // This dummy array is describing the slots templates
  private stampsOrientations: number[][] = [[1, 2],
  [2, 2],
  [2, 1, 2],
  [3, 3],
  [3, 3, 1],
  [4, 4],
  [3, 3, 3],
  [3, 3, 3, 1]];

  @Input()
  private stamps: PuzzleCollectStamp[] | null = [];

  @Input()
  public showStampsCounter: boolean = true;

  @Input()
  private rewards: PuzzleCollectReward[] = [];

  @Input()
  private nbSlots: number = null;

  @Input()
  private preStampImg: string = null;

  @Input()
  private postStampImg: string = null;

  @Input()
  private rewardPreStamp: string = null;

  @Input()
  private rewardPostStamp: string = null;

  @Output()
  private availableStampClicked: EventEmitter<PuzzleCollectStamp> = new EventEmitter<PuzzleCollectStamp>();

  public currentActiveOrientation: number[] = null;
  public availStamps: number = 0;
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.nbSlots) {
      this.currentActiveOrientation = this.stampsOrientations[this.nbSlots - 3];
    }
    if (changes.stamps) {
      this.availStamps = this.stamps.filter(stamp => stamp.state === 'issued').length;
    }
  }

  public counter(i: number): number[] {
    return new Array(i);
  }

  private isIndexPresentInRewards(index: number): boolean {
    let isPresent = false;
    this.rewards.forEach(element => {
      if (element.rewardPosition === index) {
        isPresent = true;
      }
    });
    return isPresent;
  }

  public getStampImage(index: number, rowNum: number): string {

    const itemIndex = this.getItemIndex(index, rowNum);

    const stamped: boolean = (itemIndex < this.stamps.length && this.stamps[itemIndex].state === PuzzleCollectStampState.redeemed);

    if (this.isIndexPresentInRewards(itemIndex)) {
      return stamped ? this.rewardPostStamp : this.rewardPreStamp;
    }

    return stamped ? this.postStampImg : this.preStampImg;
  }

  public isIssued(index: number, rowNum: number): boolean {
    const itemIndex = this.getItemIndex(index, rowNum);
    if (itemIndex < this.stamps.length) {
      return this.stamps[itemIndex].state === PuzzleCollectStampState.issued;
    }
    return false;
  }

  public onAvailableStampClicked(index: number, rowNum: number): void {
    const itemIndex = this.getItemIndex(index, rowNum);
    if (itemIndex < this.stamps.length) {
      this.stamps[itemIndex].state = PuzzleCollectStampState.redeemed;
      this.availableStampClicked.emit(this.stamps[itemIndex]);
    }
  }

  private getItemIndex(index: number, rowNum: number): number {
    let itemIndex = index;
    for (let i = 0; i < this.currentActiveOrientation.length; i++) {
      if (rowNum > i) {
        itemIndex += this.currentActiveOrientation[i];
      }
    }
    return itemIndex;
  }
}
