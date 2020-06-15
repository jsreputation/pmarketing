import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import { IStamp, StampState } from '../../stamp/models/stamp.model';
import { PuzzleCollectReward } from '../models/puzzle-stamp.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'perx-core-puzzle-collect-stamps',
  templateUrl: './puzzle-collect-stamps.component.html',
  styleUrls: ['./puzzle-collect-stamps.component.scss']
})

export class PuzzleCollectStampsComponent implements OnChanges, OnInit {
  @Input()
  public defaultCardBgImage: string = '';
  @Input()
  public defaultstampCardImage: string = '';

  @Input()
  public stamps: IStamp[] | null = [];

  @Input()
  public showStampsCounter: boolean = false;

  @Input()
  private rewards: PuzzleCollectReward[] = [];

  @Input()
  public nbSlots: number | null = null;

  @Input()
  public numberOfCols: number | undefined;

  @Input()
  public numberOfRows: number | undefined;

  @Input()
  private preStampImg: string | null = null;

  @Input()
  private postStampImg: string | null = null;

  @Input()
  private rewardPreStamp: string | null = null;

  @Input()
  private rewardPostStamp: string | null = null;

  @Input()
  public cardBgImage: string | null = null;

  @Input()
  public title: string | null = null;

  @Input()
  public subTitle: string | null = null;

  @Input()
  public newStampsLabelFn: () => Observable<string>;

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
    this.updateActiveOrientation();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.nbSlots && this.nbSlots) {
      this.updateActiveOrientation();
    }
    if (changes.stamps && this.stamps) {
      this.availableStampCount = this.stamps.filter(stamp => stamp.state === StampState.issued).length;
    }
  }

  private updateActiveOrientation(): void {
    if (this.nbSlots) {
      this.numberOfCols = this.numberOfCols || 3;
      this.numberOfRows = this.numberOfRows || Math.ceil(this.nbSlots / this.numberOfCols);

      this.currentActiveOrientation = Array(this.numberOfRows - 1).fill(this.numberOfCols);
      this.currentActiveOrientation.push(this.nbSlots % this.numberOfCols || this.numberOfCols);
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

  public getStampImage(index: number, rowNum: number): string | null {
    const itemIndex = this.getItemIndex(index, rowNum);

    const stamped: boolean = (
      this.stamps !== null &&
      itemIndex < this.stamps.length &&
      this.stamps[itemIndex].state === StampState.redeemed
    );

    const isIssued = this.isIssued(index, rowNum);

    if (this.isIndexPresentInRewards(itemIndex)) {
      const rewardPreStampImage = isIssued && this.availableRewardImg && this.availableStampCount > 0
        ? this.availableRewardImg : this.rewardPreStamp;
      return stamped ? this.rewardPostStamp : rewardPreStampImage;
    }

    const preImage = this.availableStampImg ? this.availableStampImg : this.preStampImg;
    const preStampImage = isIssued ? preImage : this.preStampImg;

    return stamped ? this.postStampImg : preStampImage;
  }

  public isIssued(index: number, rowNum: number): boolean {
    const itemIndex = this.getItemIndex(index, rowNum);
    if (this.stamps && itemIndex < this.stamps.length) {
      return this.stamps[itemIndex].state === StampState.issued;
    }
    return false;
  }

  public onAvailableStampClicked(index: number, rowNum: number): void {
    if (!this.isIssued(index, rowNum)) {
      return;
    }
    const itemIndex = this.getItemIndex(index, rowNum);
    if (this.stamps && itemIndex < this.stamps.length) {
      //   this.stamps[itemIndex].state = StampState.redeemed;
      this.availableStampClicked.emit(this.stamps[itemIndex]);
    }
  }

  private getItemIndex(index: number, rowNum: number): number {
    let itemIndex = index;
    if (this.currentActiveOrientation === null) {
      return itemIndex;
    }
    for (let i = 0; i < this.currentActiveOrientation.length; i++) {
      if (rowNum > i) {
        itemIndex += this.currentActiveOrientation[i];
      }
    }
    return itemIndex;
  }

  public hasCustomStamp(): boolean {
    return this.availableStampImg != null;
  }
}
