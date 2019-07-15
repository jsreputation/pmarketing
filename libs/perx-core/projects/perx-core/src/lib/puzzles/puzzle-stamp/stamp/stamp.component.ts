import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'perx-core-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.css']
})
export class StampComponent implements OnInit, DoCheck {
  @Input() lockImg: string;
  @Input() unlockImg: string;
  @Input() available: boolean;
  @Input() isUnlockedAll: boolean;

  @Output() moveCard = new EventEmitter();


  imageLock: string;
  
  constructor() { }

  ngOnInit() {
    this.imageLock = this.unlockImg;
  }

  ngDoCheck() {
    // lock to unlock animation on unlock all button click
    // if(this.isUnlockedAll) {
    //   this.imageLock = this.unlockImg;
    // }
  }

  onCardUnlock(){
    if(this.available) {
      // lock to unlock animation on card click
      // this.imageLock = this.unlockImg; 
      this.moveCard.emit();
    }
  }

  unlockAllAvailableCards() {
    if(this.available) {
      this.imageLock = this.unlockImg;
    }
  }
}
