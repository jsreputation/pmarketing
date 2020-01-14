import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IGameComponent } from '../igame.component';
import { Shake } from '../../utils/shake';

const enum GiftStatus {
  hang = 'hang',
  drop = 'drop'
}

export interface IManStyle {
  left: string;
  bottom: string;
}

export interface IGift {
  id: number;
  status: GiftStatus;
  display: boolean;
}

@Component({
  selector: 'perx-core-shake-tree',
  templateUrl: './shake-tree.component.html',
  styleUrls: ['./shake-tree.component.scss']
})
export class ShakeTreeComponent implements OnInit, OnChanges, IGameComponent, OnDestroy {
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
  public nbHangedGifts: number = 3;
  @Input()
  public nbFallingGifts: number = 3;
  @Input()
  public enabled: boolean = true;

  @Input()
  public distanceFromTree: number = 16;
  @Input()
  public bottomDistance: number = 5;

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public tap: EventEmitter<number> = new EventEmitter<number>();

  public gifts: IGift[] = [
    { id: 1, status: GiftStatus.hang, display: true },
    { id: 2, status: GiftStatus.hang, display: true },
    { id: 3, status: GiftStatus.hang, display: true },
    { id: 4, status: GiftStatus.hang, display: true },
    { id: 5, status: GiftStatus.hang, display: true },
    { id: 6, status: GiftStatus.hang, display: true },
    { id: 7, status: GiftStatus.hang, display: true },
    { id: 8, status: GiftStatus.hang, display: true },
    { id: 9, status: GiftStatus.hang, display: true },
    { id: 10, status: GiftStatus.hang, display: true }
  ];

  public celebrate: boolean = false;
  public shakeAnimationClass: string = '';

  private n: number = 0;
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
    this.tap.complete();
    this.completed.complete();
    window.removeEventListener(Shake.EVENT, this.tapped, false);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.nbHangedGifts) {
      this.updateGifts();
    }
  }

  public tapped(): void {
    if (this.enabled) {
      this.tap.emit(this.n);
      this.n++;
      this.shakeAnimationClass = '';
      this.getCurrentShakeAction(this.n).pipe(delay(100)).subscribe(className => this.shakeAnimationClass = className);
      // @ts-ignore
      if (this.n === Number.parseInt(this.nbShakes, 10)) {
        this.gifts
          .filter(gift => gift.id <= this.nbFallingGifts)
          .forEach(gift => gift.status = GiftStatus.drop);
        setTimeout(() => {
          this.celebrate = true;
          this.completed.emit();
        }, 300);
      }

    }
  }

  public getManStyle(): IManStyle {
    return {
      left: `${this.distanceFromTree}%`,
      bottom: `${this.bottomDistance}%`,
    };
  }

  public reset(): void {
    this.gifts
      .filter(gift => gift.id <= this.nbHangedGifts)
      .forEach(gift => gift.status = GiftStatus.hang);
    this.n = 0;
    this.celebrate = false;
    this.shakeAnimationClass = '';
  }

  private getCurrentShakeAction(ngTap: number): Observable<string> {
    if (ngTap < this.nbShakes) {
      return of('shake');
    }
    return of('');
  }

  private updateGifts(): void {
    this.gifts
      .forEach(gift => gift.display = gift.id <= this.nbHangedGifts);
  }
}
