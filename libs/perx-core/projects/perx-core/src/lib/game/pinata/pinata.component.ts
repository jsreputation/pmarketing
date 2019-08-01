import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IGameComponent } from '../IGame.component';

@Component({
  selector: 'perx-core-pinata',
  templateUrl: './pinata.component.html',
  styleUrls: ['./pinata.component.css']
})
export class PinataComponent implements OnInit, OnDestroy, IGameComponent {
  @Input()
  public stillImg: string;
  @Input()
  public movingImg: string;
  @Input()
  public openedImg: string;
  @Input()
  public nbTaps: number = 5;
  @Input()
  public enabled: boolean = false;

  @Output() public tap: EventEmitter<number> = new EventEmitter();
  @Output() public broken: EventEmitter<void> = new EventEmitter();

  public shakeAnimationClass: string = '';
  public currentImg: string;

  private n: number = 0;

  public ngOnInit(): void {
    this.currentImg = this.stillImg;
  }

  public ngOnDestroy(): void {
    [this.tap, this.broken].forEach(emitter => emitter.complete());
  }

  public shake(): void {
    if (this.enabled) {
      this.n++;
      if (this.n < this.nbTaps) {
        if (this.movingImg !== undefined && this.movingImg !== null) {
          this.currentImg = this.movingImg;
        }
        this.shakeAnimationClass = '';
        this.tap.emit(this.n);
        setTimeout(() => {
          this.shakeAnimationClass = 'shake';
        }, 0);
      } else if (this.n === this.nbTaps) {
        this.tap.emit(this.n);
        this.broken.emit();
        this.currentImg = this.openedImg;
      }
    }
  }

  public reset(): void {
    this.n = 0;
    this.currentImg = this.stillImg;
    this.shakeAnimationClass = '';
  }
}
