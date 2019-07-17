import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'perx-core-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.css']
})
export class StampComponent implements OnInit, DoCheck {
  @Input() public lockImg: string;
  @Input() public unlockImg: string;
  @Input() public available: boolean;
  @Input() public isUnlockedAll: boolean;
  @Input() public isCurrent: boolean;

  @Output() public moveCard = new EventEmitter();

  protected imageLock: string;

  public ngOnInit(): void {
    this.imageLock = this.lockImg;
  }

  public ngDoCheck(): void {
    // lock to unlock animation on unlock all button click
    if (this.isUnlockedAll) {
      this.imageLock = this.unlockImg;
    }
  }

  public changeLockImage(): void {
    // lock to unlock animation on card click
    if (this.isCurrent) {
      this.imageLock = this.unlockImg;
    }
  }

  public onCardUnlock(): void {
    if (this.available) {
      this.moveCard.emit();
    }
  }

  public unlockAllAvailableCards(): void {
    if (this.available) {
      this.imageLock = this.unlockImg;
    }
  }
}
