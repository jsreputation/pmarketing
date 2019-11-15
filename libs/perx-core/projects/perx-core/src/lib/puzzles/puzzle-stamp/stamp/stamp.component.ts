import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { IStamp } from '../../../stamp/models/stamp.model';

@Component({
  selector: 'perx-core-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.scss']
})
export class StampComponent implements OnInit, DoCheck {
  @Input() public lockImg: string;
  @Input() public unlockImg: string;
  @Input() public available: boolean;
  @Input() public isUnlockedAll: boolean;
  @Input() public isCurrent: boolean;
  @Input() public stampColumn: number;
  @Input() public stamps: IStamp[];

  @Output() public moveCard: EventEmitter<void> = new EventEmitter();

  public imageLock: string | undefined;

  public ngOnInit(): void {
    this.imageLock = this.lockImg;
  }

  public ngDoCheck(): void {
    // lock to unlock animation on unlock all button click
    if (this.isUnlockedAll) {
      this.imageLock = this.unlockImg;
    }
  }

  private isCurrentStamp(): boolean {
    const selectedStamp = this.stamps[this.stampColumn].id;
    const activeStamp = this.stamps.filter(stamp => stamp.state === 'issued')[0].id;
    return selectedStamp === activeStamp;
  }

  public changeLockImage(): void {
    // lock to unlock animation on card click
    if (this.isCurrent && this.isCurrentStamp()) {
      this.imageLock = this.unlockImg;
    }
  }

  public onCardUnlock(): void {
    if (this.isCurrent && this.isCurrentStamp()) {
      this.moveCard.emit();
    }
  }

  public unlockAllAvailableCards(): void {
    if (this.available) {
      this.imageLock = this.unlockImg;
    }
  }
}
