import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'perx-core-pinata',
  templateUrl: './pinata.component.html',
  styleUrls: ['./pinata.component.css']
})
export class PinataComponent implements OnInit, OnDestroy {
  @Input()
  public stillImg: string;
  @Input()
  public movingImg: string;
  @Input()
  public openedImg: string;
  @Input()
  public nbTaps = 5;
  @Input()
  public enabled = false;

  @Output() public tap: EventEmitter<number> = new EventEmitter();
  @Output() public broken: EventEmitter<void> = new EventEmitter();

  public shakeAnimationClass = '';
  private n = 0;

  public currentImg: string;

  constructor() { }

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
