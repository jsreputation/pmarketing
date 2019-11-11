import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import { IStamp, StampState } from '../../stamp/models/stamp.model';
import { PuzzleCollectReward } from '../models/puzzle-stamp.model';

@Component({
  selector: 'perx-core-puzzle-collect-stamps',
  templateUrl: './puzzle-collect-stamps.component.html',
  styleUrls: ['./puzzle-collect-stamps.component.scss']
})

export class PuzzleCollectStampsComponent implements OnChanges, OnInit {
  // This dummy array is describing the slots templates
  private stampsOrientations: number[][] = [
    [1, 2],
    [2, 2],
    [2, 1, 2],
    [3, 3],
    [3, 3, 1],
    [4, 4],
    [3, 3, 3],
    [3, 3, 3, 1]
  ];

  @Input()
  private stamps: IStamp[] | null = [];

  @Input()
  public showStampsCounter: boolean = false;

  @Input()
  private rewards: PuzzleCollectReward[] = [];

  @Input()
  private nbSlots: number | null = null;

  @Input()
  private preStampImg: string | null = null;

  @Input()
  private postStampImg: string | null = null;

  @Input()
  private rewardPreStamp: string | null = null;

  @Input()
  private rewardPostStamp: string | null = null;

  @Input()
  public backgroundImage: string | null = null;

  @Input()
  public cardBgImage: string | null = null;

  @Input()
  public title: string | null = null;

  @Input()
  public subTitle: string | null = null;

  @Input()
  public availableStampImg: string | null = null;

  @Input()
  public availableRewardImg: string | null = null;

  @Output()
  private availableStampClicked: EventEmitter<IStamp> = new EventEmitter<IStamp>();

  public currentActiveOrientation: number[] | null = null;
  public stampCardImage: string | null = null;
  public availableStampCount: number = 0;

  public ngOnInit(): void {
    if (!Array.isArray(this.stamps)) {
      this.stamps = [];
    }
    const availableStamps = this.stamps.filter(stamp => stamp.state === StampState.issued);
    this.availableStampCount = availableStamps.length;
    this.stampCardImage = this.postStampImg;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.nbSlots && this.nbSlots) {
      this.currentActiveOrientation = this.stampsOrientations[this.nbSlots - 3];
    }
    if (changes.stamps && this.stamps) {
      this.availableStampCount = this.stamps.filter(stamp => stamp.state === StampState.issued).length;
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

    const stamped: boolean = (itemIndex < this.stamps.length && this.stamps[itemIndex].state === StampState.redeemed);

    if (this.isIndexPresentInRewards(itemIndex)) {
      const rewardPreStampImage = this.availableRewardImg ? this.availableRewardImg : this.rewardPreStamp;
      return stamped ? this.rewardPostStamp : rewardPreStampImage;
    }

    const preStampImage = this.isIssued(index, rowNum) ? this.availableStampImg : this.preStampImg;

    return stamped ? this.postStampImg : preStampImage;
  }

  public isIssued(index: number, rowNum: number): boolean {
    const itemIndex = this.getItemIndex(index, rowNum);
    if (itemIndex < this.stamps.length) {
      return this.stamps[itemIndex].state === StampState.issued;
    }
    return false;
  }

  public onAvailableStampClicked(index: number, rowNum: number): void {
    if (!this.isIssued(index, rowNum)) {
      return;
    }
    const itemIndex = this.getItemIndex(index, rowNum);
    if (itemIndex < this.stamps.length) {
      //   this.stamps[itemIndex].state = StampState.redeemed;
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
