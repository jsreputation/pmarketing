import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'perx-core-shake-tree',
  templateUrl: './shake-tree.component.html',
  styleUrls: ['./shake-tree.component.scss']
})
export class ShakeTreeComponent implements OnInit, OnChanges {
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
  nbHangedGifts = 1;
  @Input()
  nbFallingGifts = 10;
  @Input()
  enabled = false;

  @Input()
  distanceFromTree = 16;
  @Input()
  bottomDistance = 5;

  @Output()
  completed: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  tap: EventEmitter<number> = new EventEmitter<number>();

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

  ngOnInit() {
    this.updateGifts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nbHangedGifts) {
      this.updateGifts();
    }
  }

  private updateGifts() {
    this.gifts.map(gift => {
      if (gift.id > this.nbHangedGifts) {
        gift.display = false;
      }
      return gift;
    });
  }
  tapped() {
    if (this.enabled) {
      this.tap.emit(this.n);
      this.n++;
      this.shakeAnitionClass = '';
      this.getCurrentShakeAction(this.n).pipe(delay(100)).subscribe( className => this.shakeAnitionClass = className);
      if (this.n === this.nbShakes) {
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

  getCurrentShakeAction(ngTap: number): Observable<string> {
    if (ngTap < this.nbShakes) {
      return of('shake');
    }
    return of('');
  }

  getManStyle() {
    return {
          left: this.distanceFromTree + '%',
          bottom: this.bottomDistance + '%',
        };
  }
}
