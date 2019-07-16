import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'perx-core-pinata',
  templateUrl: './pinata.component.html',
  styleUrls: ['./pinata.component.css']
})
export class PinataComponent implements OnInit, OnDestroy {
  @Input()
  stillImg: string;
  @Input()
  movingImg: string;
  @Input()
  openedImg: string;
  @Input()
  nbTaps = 5;
  @Input()
  enabled = false;

  @Output() tap: EventEmitter<number> = new EventEmitter();
  @Output() broken: EventEmitter<void> = new EventEmitter();

  shakeAnimationClass = '';
  private n = 0;

  currentImg: string;

  constructor() { }

  ngOnInit(): void {
    this.currentImg = this.stillImg;
  }

  ngOnDestroy(): void {
    [this.tap, this.broken].forEach(emitter => emitter.complete());
  }

  shake(): void {
    if (this.enabled) {
      this.n++;
      if (this.n < this.nbTaps) {
        this.shakeAnimationClass = '';
        this.tap.emit(this.n);
        setTimeout(() => {
          this.shakeAnimationClass = 'shake';
        }, 0);
      } else {
        this.tap.emit(this.n);
        this.broken.emit();
        this.broken.complete();
        this.tap.complete();
        this.currentImg = this.openedImg;
      }
    }
  }
}
