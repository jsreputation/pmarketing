import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'perx-core-pinata',
  templateUrl: './pinata.component.html',
  styleUrls: ['./pinata.component.css']
})
export class PinataComponent implements OnInit {
  @Input()
  stillImg: string;
  @Input()
  movingImg: string;
  @Input()
  openedImg: string;
  @Input()
  npTaps = 5;
  @Input()
  enabled = false;

  @Output() tap = new EventEmitter();

  shakeAnimationClass = '';
  n = 0;

  currentImg;

  constructor() {}

  ngOnInit() {
    this.currentImg = this.stillImg;
  }

  shake() {
    if (this.enabled) {
      if (this.n < this.npTaps) {
        this.shakeAnimationClass = '';
        setTimeout(() => {
          this.shakeAnimationClass = 'shake';
        }, 0);
        this.n++;
      } else if (this.n === this.npTaps) {
        this.currentImg = this.openedImg;
      }
      this.tap.emit({ tap: this.n });
    }
  }
}
