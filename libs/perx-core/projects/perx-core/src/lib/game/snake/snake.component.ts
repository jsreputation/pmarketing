import { Number2 } from './number2';
import {Input} from '@angular/core';
// https://codepen.io/mexitalian/pen/pNQgae // not very useful, not hammer js
export class Snake {
  @Input()
  public target: string;
  @Input()
  public snake: string;
  @Input()
  public background: string;
  // snake head position
  private p: Number2 = new Number2(10, 10);
  // square size
  private gs = 20;
  // board size
  private tc = 20;
  // target position
  private a: Number2 = new Number2(15, 15);
  // direction
  private v: Number2 = new Number2(0, 0);

  private trail: Number2[] = [];
  // tail length
  private tail = 20;
  private ctx: CanvasRenderingContext2D;

  constructor(private canv: HTMLCanvasElement) {
    this.ctx = this.canv.getContext('2d') as CanvasRenderingContext2D;

    this.keyPush = this.keyPush.bind(this);
    this.game = this.game.bind(this);
    document.addEventListener('keydown', this.keyPush);
  }

  public start(): void {
    setInterval(() => { this.game(), this.render(); }, 1000 / 15);
  }

  private game() {
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
    this.ctx.fillStyle = "black"; // will change base on input -> everything here on fillStyle
    this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);

    // render snake
    this.ctx.fillStyle = "lime";
    for (var i = 0; i < this.trail.length; i++) {
      this.ctx.fillRect(this.trail[i].x * this.gs, this.trail[i].y * this.gs, this.gs - 2, this.gs - 2);
    }

    //render target
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.a.x * this.gs, this.a.y * this.gs, this.gs - 2, this.gs - 2);
  }

  private up(): void {
    if (this.v.y === 0) {
      this.v.x = 0;
      this.v.y = 1;
    }
  }

  private down(): void {
    if (this.v.y === 0) {
      this.v.x = 0;
      this.v.y = -1;
    }
  }
  private left(): void {
    if (this.v.x === 0) {
      this.v.x = -1;
      this.v.y = 0;
    }
  }

  private right(): void {
    if (this.v.x === 0) {
      this.v.x = 1;
      this.v.y = 0;
    }
  }

  private keyPush(evt: KeyboardEvent): void {
    switch (evt.keyCode) {
      //left
      case 37:
        this.left()
        break;
      //down
      case 38:
        this.down();
        break;
      //right
      case 39:
        this.right();
        break;
      //up
      case 40:
        this.up();
        break;
    }
  }
}
