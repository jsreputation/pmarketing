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

import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter, OnDestroy} from '@angular/core';
import { getImageCors } from '../../utils/getImageCors';
// https://codepen.io/mexitalian/pen/pNQgae // not very useful, not hammer js
@Component({
  selector: 'perx-core-snake-game',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeGameComponent implements OnChanges, OnDestroy {
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
  @Input()
  public target: string;
  @Input()
  public snake: string;
  @Input()
  public colorSnake: string = 'lime';
  @Input()
  public background: string;
  @Input()
  public rateOfExpansion: number = 3;
  @Input()
  public targetsToWin: number = 5;
  @Input()
  public fps: number = 40;

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
  private backgroundImgLoaded!: HTMLImageElement;
  private snakeImgLoaded!: HTMLImageElement;

  private TOTAL_IMAGES: number = 3;
  private COUNTER_LOADED: number = 0;

  public allImagesLoaded: boolean = false;
  public score: number = 0;
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  public request: number;
  // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
  public fpsInterval: number;
  public now: number;
  public then: number;
  public startTime: number;
  public elapsed: number;

  public gameStop: boolean = false;

  public startAnimating(): void {
    this.fpsInterval = 1000 / 5;
    this.then = window.performance.now();
    this.startTime = this.then;
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
    if ((changes.target && this.target)
      || (changes.snake && this.snake)
      || (changes.background && this.background)) {
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
    return this.checkCollisionWithWall() || this.checkCollisionWithWall();
  }

  private game(): void {
    if (this.checkGameOver()) {
      alert('you LOST');
    }
    // update snake
    this.trail.push(new Number2(this.p.x, this.p.y));

    this.p.add(this.v);

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
      while (this.a.equals(this.p)) {
        this.a.randomize(this.tc);
      }
    }
  }

  private render(): void {
    // render board
    this.ctx.drawImage(this.backgroundImgLoaded, 0, 0, this.canv.width, this.canv.height);
    // render snake
    this.ctx.fillStyle = this.ctx.createPattern(this.snakeImgLoaded as HTMLImageElement, 'repeat') || 'lime';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.trail.length; i++) {
      this.ctx.fillRect(this.trail[i].x * this.gs, this.trail[i].y * this.gs, this.gs - 2 , this.gs - 2);
    }
    this.ctx.drawImage(this.targetImgLoaded, this.a.x * this.gs, this.a.y * this.gs, this.gs - 2, this.gs - 2);

  }

  private onloadCallBack(): null {
    this.COUNTER_LOADED++;
    if (this.COUNTER_LOADED < this.TOTAL_IMAGES) {
      return null;
    }
    // trigger final callback if is the last image
    return (() => {
      console.log('ALL LOADED, PROBABLY');
      this.allImagesLoaded = true;
      return null;
    })();
  }

  private fillStyles(): void {
    this.targetImgLoaded = getImageCors(this.target);
    this.backgroundImgLoaded = getImageCors(this.background);
    this.snakeImgLoaded = getImageCors(this.snake);
    this.targetImgLoaded.onload = this.onloadCallBack.bind(this);
    this.backgroundImgLoaded.onload = this.onloadCallBack.bind(this);
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
  }

}
