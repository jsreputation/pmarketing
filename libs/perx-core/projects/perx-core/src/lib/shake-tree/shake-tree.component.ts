import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'perx-core-shake-tree',
  templateUrl: './shake-tree.component.html',
  styleUrls: ['./shake-tree.component.css']
})
export class ShakeTreeComponent implements OnInit {
  @Input()
  requiredTaps = 5;
  @Input()
  treeImg: string;
  @Input()
  giftImg: string;
  @Input()
  waitingManImg: string;
  @Input()
  waitingManCelebrateImg: string;

  @Input()
  nbFallingGifts = 3;

  @Input()
  enabled = false;

  @Output()
  completed: EventEmitter<void> = new EventEmitter<void>();

  gifts = [
    { id: 1, status: 'hang', display: true},
    { id: 2, status: 'hang', display: true},
    { id: 3, status: 'hang', display: true},
    { id: 4, status: 'hang', display: true},
    { id: 5, status: 'hang', display: true},
    { id: 6, status: 'hang', display: true},
    { id: 7, status: 'hang', display: false},
    { id: 8, status: 'hang', display: false},
    { id: 9, status: 'hang', display: false},
    { id: 10, status: 'hang', display: false}
  ];

  celebrate = false;
  shakeAnitionClass = '';
  n = 0;
  constructor() { }

  ngOnInit() {
  }

  tapped() {
    console.log(this.enabled);
    if (this.enabled) {
      if (this.n < this.requiredTaps) {
        this.shakeAnitionClass = '';
        setTimeout(() => {
          this.shakeAnitionClass = 'shake';
        }, 0);
        this.n++;
      } else if (this.n === this.requiredTaps) {
        this.shakeAnitionClass = '';
        this.gifts.map(gift => {
          if (gift.id <= this.nbFallingGifts) {
            gift.status = 'drop';
          }
          return gift;
        });
        // this.completed.emit();
        setTimeout(() => { this.celebrate = true; }, 500);
      }
    }
  }
}
