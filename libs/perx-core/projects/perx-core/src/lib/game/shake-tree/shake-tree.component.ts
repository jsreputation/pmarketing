import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

enum GIFT_STATUS {
  hang = 'hang',
  drop = 'drop'
}

export interface IManStyle {
  left: string;
  bottom: string;
}
@Component({
  selector: 'perx-core-shake-tree',
  templateUrl: './shake-tree.component.html',
  styleUrls: ['./shake-tree.component.scss']
})
export class ShakeTreeComponent implements OnInit, OnChanges {
  @Input()
  public treeImg: string;
  @Input()
  public giftImg: string;
  @Input()
  public waitingManImg: string;
  @Input()
  public waitingManCelebrateImg: string;
  @Input()
  public nbShakes = 1;
  @Input()
  public nbHangedGifts = 1;
  @Input()
  public nbFallingGifts = 10;
  @Input()
  public enabled = false;

  @Input()
  public distanceFromTree = 16;
  @Input()
  public bottomDistance = 5;

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public tap: EventEmitter<number> = new EventEmitter<number>();

  public gifts = [
    { id: 1, status: GIFT_STATUS.hang, display: true },
    { id: 2, status: GIFT_STATUS.hang, display: true },
    { id: 3, status: GIFT_STATUS.hang, display: true },
    { id: 4, status: GIFT_STATUS.hang, display: true },
    { id: 5, status: GIFT_STATUS.hang, display: true },
    { id: 6, status: GIFT_STATUS.hang, display: true },
    { id: 7, status: GIFT_STATUS.hang, display: true },
    { id: 8, status: GIFT_STATUS.hang, display: true },
    { id: 9, status: GIFT_STATUS.hang, display: true },
    { id: 10, status: GIFT_STATUS.hang, display: true }
  ];

  public celebrate = false;
  public shakeAnimationClass = '';
  public n = 0;

  public ngOnInit(): void {
    this.updateGifts();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.nbHangedGifts) {
      this.updateGifts();
    }
  }

  private updateGifts(): void {
    this.gifts.map(gift => {
      if (gift.id > this.nbHangedGifts) {
        gift.display = false;
      }
      return gift;
    });
  }
  public tapped(): void {
    if (this.enabled) {
      this.tap.emit(this.n);
      this.n++;
      this.shakeAnimationClass = '';
      this.getCurrentShakeAction(this.n).pipe(delay(100)).subscribe(className => this.shakeAnimationClass = className);
      if (this.n === this.nbShakes) {
        this.gifts.map(gift => {
          if (gift.id <= this.nbFallingGifts) {
            gift.status = GIFT_STATUS.drop;
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

  public getCurrentShakeAction(ngTap: number): Observable<string> {
    if (ngTap < this.nbShakes) {
      return of('shake');
    }
    return of('');
  }

  public getManStyle(): IManStyle {
    return {
      left: this.distanceFromTree + '%',
      bottom: this.bottomDistance + '%',
    };
  }
}
