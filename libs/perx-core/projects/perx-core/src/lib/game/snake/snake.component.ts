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

import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter} from '@angular/core';
import { getImageCors } from '../../utils/getImageCors';
// https://codepen.io/mexitalian/pen/pNQgae // not very useful, not hammer js
@Component({
  selector: 'perx-core-snake-game',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeGameComponent implements OnChanges {
  private get canv(): HTMLCanvasElement { return this.canvasEl.nativeElement; }
  // public gameStarted: boolean = false;

  public get ctx(): CanvasRenderingContext2D {
    if (!this.ctx_ && this.canv.getContext) {
      this.canv.width = 400; // set as input this.inputtedHeight(if) || 400 also need update tc and gs etc
      this.canv.height = 400;
      this.ctx_ = this.canv.getContext('2d') as CanvasRenderingContext2D;
    }
    return this.ctx_;
  }
  @Input()
  public targetUrl: string;
  @Input()
  public snakeHeadUrl: string;
  @Input()
  public gameAreaUrl: string;
  @Input()
  public rateOfExpansion: number = 3;
  @Input()
  public targetsToWin: number = 5;
  @Input()
  public fps: number = 10;

  @Output() public broken: EventEmitter<void> = new EventEmitter();

  @ViewChild('canvasSnake', { static: true })
  public canvasEl: ElementRef<HTMLCanvasElement>;
  @ViewChild('scoreBoard', { static: true })
  public scoreEl: ElementRef<HTMLDivElement>;

  // tslint:disable-next-line:variable-name
  private ctx_: CanvasRenderingContext2D;
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
  // speed
  private speed: number = 1;
  // private intervals: any[] = [];
  private trail: Number2[] = [];
  // tail length
  private tail: number = 5;
  private targetImgLoaded!: HTMLImageElement;
  private gameAreaImgLoaded!: HTMLImageElement;
  private snakeImgLoaded!: HTMLImageElement;

  private TOTAL_IMAGES: number = 3;
  private counterLoaded: number = 0;

  public allImagesLoaded: boolean = false;
  public score: number = 0;

  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  public request: number;
  // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
  private fpsInterval: number;
  private now: number;
  private then: number;
  private elapsed: number;

  private startedMoving: boolean = false;
  private gameStop: boolean = false;

  constructor() {
    // the bindings are necessary to keep track of correct, common game state
    this.keyPush = this.keyPush.bind(this);
    this.game = this.game.bind(this);
    this.checkCollisionWithWall = this.checkCollisionWithWall.bind(this);
    this.checkCollisionWithSelf = this.checkCollisionWithSelf.bind(this);
    this.checkGameOver = this.checkGameOver.bind(this);
    this.startGameAndRender = this.startGameAndRender.bind(this);
    document.addEventListener('keydown', this.keyPush);
  }

  public startAnimating(): void {
    this.fpsInterval = 1000 / this.fps;
    this.then = window.performance.now();
    this.startGameAndRender();
  }

  public startGameAndRender(newtime?: number): number | undefined {
    if (this.gameStop) {
      return;
    }
    // request another frame;
    window.requestAnimationFrame(this.startGameAndRender);
    // calc elapsed time since last loop
    this.now = newtime as number;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      // draw
      this.game();
      this.render();
    }

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes.target && this.targetUrl)
      || (changes.snake && this.snakeHeadUrl)
      || (changes.gameArea && this.gameAreaUrl)) {
      this.fillStyles();
    }
  }

  public checkCollisionWithWall(): boolean {
    return ((this.p.x < 0) || (this.p.x > this.tc) || (this.p.y < 0) || (this.p.y > this.tc));
  }

  public checkCollisionWithSelf(): boolean {
    return this.trail.some(q => q.equals(this.p));
  }

  public checkGameOver(): boolean {
    return this.checkCollisionWithWall() || this.checkCollisionWithSelf();
  }

  private game(): void {

    // update snake
    this.trail.push(new Number2(this.p.x, this.p.y));
    // head is one step ahead, if a  is any part of the trail means it went back
    this.p.add(this.v);

    if (this.checkGameOver() && this.startedMoving) {
      console.log('LOSER!');
      // then disable controls
      document.removeEventListener('keydown', this.keyPush);
    }

    // remove extra tail pieces, tail is what u have eaten, keep consistent
    while (this.trail.length > this.tail) {
      this.trail.shift();
    }

    // update target check eat food
    if (this.a.equals(this.p)) {
      this.tail += this.rateOfExpansion;
      this.score += 1;
      if (this.score === this.targetsToWin) {
        // alert('WIN!');
        // end game
        this.broken.emit();
      }
      // still this on top of me
      while (this.a.equals(this.p)) {
        this.a.randomize(this.tc);
      }
    }
  }

  public render(): void {
    // render board
    this.ctx.drawImage(this.gameAreaImgLoaded, 0, 0, this.canv.width, this.canv.height);
    // render snake
    // maybe draw the head separately???
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.trail.length; i++) {
      this.ctx.drawImage(this.snakeImgLoaded, this.trail[i].x * this.gs, this.trail[i].y * this.gs, this.gs - 2 , this.gs - 2);
    }
    this.ctx.drawImage(this.targetImgLoaded, this.a.x * this.gs, this.a.y * this.gs, this.gs - 2, this.gs - 2);

  }

  private onloadCallBack(): null {
    this.counterLoaded++;
    if (this.counterLoaded < this.TOTAL_IMAGES) {
      return null;
    }
    // trigger final callback if is the last image
    this.allImagesLoaded = true;
    return null;
  }

  private fillStyles(): void {
    this.targetImgLoaded = getImageCors(this.targetUrl);
    this.gameAreaImgLoaded = getImageCors(this.gameAreaUrl);
    this.snakeImgLoaded = getImageCors(this.snakeHeadUrl);
    this.targetImgLoaded.onload = this.onloadCallBack.bind(this);
    this.gameAreaImgLoaded.onload = this.onloadCallBack.bind(this);
    this.snakeImgLoaded.onload = this.onloadCallBack.bind(this);
  }

  public down(): void {
    if (this.v.y === 0) {
      this.v.x = 0;
      this.v.y = this.speed;
    }
  }

  public up(): void {
    if (this.v.y === 0) {
      this.v.x = 0;
      this.v.y = -this.speed;
    }
  }
  public left(): void {
    if (this.v.x === 0) {
      this.v.x = -this.speed;
      this.v.y = 0;
    }
  }

  public right(): void {
    if (this.v.x === 0) {
      this.v.x = this.speed;
      this.v.y = 0;
    }
  }

  private keyPush(evt: KeyboardEvent): void {
    switch (evt.key) {
      case 'ArrowLeft':
        if (!this.startedMoving) {
          this.startedMoving = true;
        }
        this.left();
        break;
      case 'ArrowUp':
        if (!this.startedMoving) {
          this.startedMoving = true;
        }
        this.up();
        break;
      case 'ArrowRight':
        if (!this.startedMoving) {
          this.startedMoving = true;
        }
        this.right();
        break;
      case 'ArrowDown':
        if (!this.startedMoving) {
          this.startedMoving = true;
        }
        this.down();
        break;
    }
  }

}
