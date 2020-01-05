export class Number2 {
  constructor(public x: number, public y: number) { }

  public equals(p: Number2): boolean {
    return this.x === p.x && this.y === p.y;
  }

  public randomize(c: number): void {
    this.x = Math.floor(Math.random() * c);
    this.y = Math.floor(Math.random() * c);
  }

  public add(a: Number2): void {
    this.x += a.x;
    this.y += a.y;
  }
}

import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { getImageCors } from '../../utils/getImageCors';
// https://codepen.io/mexitalian/pen/pNQgae // not very useful, not hammer js
@Component({
  selector: 'perx-core-snake-game',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeGameComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  public target: string;
  @Input()
  public snake: string;
  @Input()
  public background: string;

  @ViewChild('canvasSnake', { static: true })
  public canvasEl: ElementRef<HTMLCanvasElement>;

  // tslint:disable-next-line:variable-name
  private ctx_: CanvasRenderingContext2D;
  private get canv(): HTMLCanvasElement { return this.canvasEl.nativeElement; }
  // snake head position
  private p: Number2 = new Number2(10, 10);
  // square size
  private gs: number = 20;
  // board size
  private tc: number = 20;
  // target position
  private a: Number2 = new Number2(15, 15);
  // direction
  private v: Number2 = new Number2(0, 0);
  private intervals: any[] = [];
  private trail: Number2[] = [];
  // tail length
  private tail: number = 20;
  private targetImgLoaded!: HTMLImageElement;

  public get ctx(): CanvasRenderingContext2D {
    if (!this.ctx_ && this.canv.getContext) {
      this.canv.width = 400; // set as input this.inputtedHeight(if) || 400 also need update tc and gs etc
      this.canv.height = 400;
      this.ctx_ = this.canv.getContext('2d') as CanvasRenderingContext2D;
    }
    return this.ctx_;
  }

  constructor() {
    this.keyPush = this.keyPush.bind(this);
    this.game = this.game.bind(this);
    document.addEventListener('keydown', this.keyPush);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes.target && this.target)
      || (changes.snake && this.snake)
      || (changes.background && this.background)) {
      this.fillTargetStyle();
    }
  }

  public ngAfterViewInit(): void {
    this.start();
  }

  public start(): void {
    const interval = setInterval(() => { this.game(), this.render(); }, 1000 / 15);
    this.intervals.push(interval);
  }

  private game(): void {
    this.p.add(this.v);
    if (this.p.x < 0) {
      this.p.x = this.tc - 1;
    }
    if (this.p.x > this.tc - 1) {
      this.p.x = 0;
    }
    if (this.p.y < 0) {
      this.p.y = this.tc - 1;
    }
    if (this.p.y > this.tc - 1) {
      this.p.y = 0;
    }

    // update snake
    if (this.trail.some(q => q.equals(this.p))) {
      this.tail = 5;
    }
    this.trail.push(new Number2(this.p.x, this.p.y));
    // remove extra tail pieces
    while (this.trail.length > this.tail) {
      this.trail.shift();
    }

    // update target
    if (this.a.equals(this.p)) {
      this.tail++;
      this.a.randomize(this.tc);
    }
  }

  private render(): void {
    // render board
    this.ctx.fillStyle = this.background || 'black'; // will change base on input -> everything here on fillStyle
    this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);

    // render snake
    this.ctx.fillStyle = this.snake || 'lime';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.trail.length; i++) {
      this.ctx.fillRect(this.trail[i].x * this.gs, this.trail[i].y * this.gs, this.gs - 2, this.gs - 2);
    }

    // render target
    if (!this.target) {
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.a.x * this.gs, this.a.y * this.gs, this.gs - 2, this.gs - 2);
    } else {
      this.ctx.drawImage(this.targetImgLoaded, this.a.x * this.gs, this.a.y * this.gs, this.gs - 2, this.gs - 2);
    }
  }

  private fillTargetStyle(): void {
    const targetImg: HTMLImageElement = getImageCors(this.target);
    targetImg.onload = () => {
      if (this.targetImgLoaded !== targetImg) {
        this.targetImgLoaded = targetImg;
      }
    };
  }

  public down(): void {
    if (this.v.y === 0) {
      this.v.x = 0;
      this.v.y = 1;
    }
  }

  public up(): void {
    if (this.v.y === 0) {
      this.v.x = 0;
      this.v.y = -1;
    }
  }
  public left(): void {
    if (this.v.x === 0) {
      this.v.x = -1;
      this.v.y = 0;
    }
  }

  public right(): void {
    if (this.v.x === 0) {
      this.v.x = 1;
      this.v.y = 0;
    }
  }

  private keyPush(evt: KeyboardEvent): void {
    switch (evt.key) {
      case 'ArrowLeft':
        console.log('left is pressed');
        this.left();
        break;
      case 'ArrowUp':
        this.up();
        break;
      case 'ArrowRight':
        this.right();
        break;
      case 'ArrowDown':
        this.down();
        break;
    }
  }

  public ngOnDestroy(): void {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals = [];
  }
}
