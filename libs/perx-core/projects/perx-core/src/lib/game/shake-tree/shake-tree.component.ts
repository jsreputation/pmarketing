import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Shake } from '../../utils/shake';

enum GIFT_STATUS {
  hang = 'hang',
  drop = 'drop'
}

export interface IManStyle {
  left: string;
  bottom: string;
}

export interface IGift {
  id: number;
  status: GIFT_STATUS;
  display: boolean;
}

@Component({
  selector: 'perx-core-shake-tree',
  templateUrl: './shake-tree.component.html',
  styleUrls: ['./shake-tree.component.scss']
})
export class ShakeTreeComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public treeImg: string;
  @Input()
  public giftImg: string;
  @Input()
  public waitingManImg: string;
  @Input()
  public waitingManCelebrateImg: string;
  @Input()
  public nbShakes: number = 1;
  @Input()
  public nbHangedGifts: number = 1;
  @Input()
  public nbFallingGifts: number = 10;
  @Input()
  public enabled: boolean = false;

  @Input()
  public distanceFromTree: number = 16;
  @Input()
  public bottomDistance: number = 5;

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public tap: EventEmitter<number> = new EventEmitter<number>();

  public gifts: IGift[] = [
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

  public celebrate: boolean = false;
  public shakeAnimationClass: string = '';
  public n: number = 0;

  private shake: Shake;

  constructor() {
    this.shake = new Shake({ threshold: 5, timeout: 500 });
    this.tapped = this.tapped.bind(this);
  }

  public ngOnInit(): void {
    this.updateGifts();
    this.shake.start();
    window.addEventListener(Shake.EVENT, this.tapped, false);
  }

  public ngOnDestroy(): void {
    this.shake.stop();
    window.removeEventListener(Shake.EVENT, this.tapped, false);
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
    console.log('tapped', this.enabled);
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
