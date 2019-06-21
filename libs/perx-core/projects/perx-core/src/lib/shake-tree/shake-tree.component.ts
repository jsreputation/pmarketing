import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'perx-core-shake-tree',
  templateUrl: './shake-tree.component.html',
  styleUrls: ['./shake-tree.component.css']
})
export class ShakeTreeComponent implements OnInit {
  @Input()
  treeImg: string;
  @Input()
  giftImg: string;
  @Input()
  waitingManImg: string;
  @Input()
  waitingManCelebrateImg: string;
  @Input()
  nbShakes = 1;

  @Input()
  nbHangedGifts = 10;

  @Input()
  nbFallingGifts = 10;

  @Input()
  enabled = false;

  @Output()
  completed: EventEmitter<void> = new EventEmitter<void>();

  gifts = [
    { id: 1, status: 'hang', display: true },
    { id: 2, status: 'hang', display: true },
    { id: 3, status: 'hang', display: true },
    { id: 4, status: 'hang', display: true },
    { id: 5, status: 'hang', display: true },
    { id: 6, status: 'hang', display: true },
    { id: 7, status: 'hang', display: true },
    { id: 8, status: 'hang', display: true },
    { id: 9, status: 'hang', display: true },
    { id: 10, status: 'hang', display: true }
  ];

  celebrate = false;
  shakeAnitionClass = '';
  n = 0;
  constructor() { }

  ngOnInit() {
    this.gifts.map(gift => {
      if (gift.id > this.nbHangedGifts) {
        gift.display = false;
      }
      return gift;
    });
  }

  tapped() {
    if (this.enabled) {
      if (this.n < this.nbShakes) {
        this.shakeAnitionClass = '';
        setTimeout(() => {
          this.shakeAnitionClass = 'shake';
        }, 0);
        this.n++;
      } else if (this.n === this.nbShakes) {
        this.shakeAnitionClass = '';
        this.gifts.map(gift => {
          if (gift.id <= this.nbFallingGifts) {
            gift.status = 'drop';
          }
          return gift;
        });
        setTimeout(() => {
          this.celebrate = true;
          this.completed.emit();
        }, 300);
      }
    }
  }
}
