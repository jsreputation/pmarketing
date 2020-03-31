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

  public get ctx(): CanvasRenderingContext2D {
    if (!this.ctx_ && this.canv.getContext) {
      this.canv.width = 400; // set as input this.inputtedHeight(if) || 400 also need update tc and cellSize etc
      this.canv.height = 400;
      this.ctx_ = this.canv.getContext('2d') as CanvasRenderingContext2D;
    }
    return this.ctx_;
  }
  @Input()
  private enabled: boolean = true;

  // display related inputs
  @Input()
  public targetUrl: string;
  @Input()
  public snakeHeadUrl: string;
  @Input()
  public snakeBodyUrl: string;
  @Input()
  public gameAreaUrl: string;

  // gameplay related inputs
  @Input()
  public rateOfExpansion: number = 3;
  @Input()
  public targetsToWin: number = 5;
  @Input()
  public fps: number = 10;
  // true for win, false for lose instead of creating another emitter
  @Output() public completed: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('canvasSnake', { static: true })
  public canvasEl: ElementRef<HTMLCanvasElement>;
  @ViewChild('scoreBoard', { static: true })
  public scoreEl: ElementRef<HTMLDivElement>;

  // tslint:disable-next-line:variable-name
  private ctx_: CanvasRenderingContext2D;
  // snake head position
  private snakePos: Number2 = new Number2(10, 10);
  // square size
  private cellSize: number = 20;
  // board size
  private numberOfCellsInBoard: number = 20;
  // target position
  private foodPosition: Number2 = new Number2(15, 15);
  // direction
  private velocity: Number2 = new Number2(0, 0);
  // speed
  private speed: number = 1; // use only whole numbers for position to match exactly in cell
  // just three values, rather than use map operations to create hardcodedly is more performant.
  private trail: Number2[] = [
    new Number2(this.snakePos.x + 1, this.snakePos.y),
    new Number2(this.snakePos.x + 2, this.snakePos.y),
    new Number2(this.snakePos.x + 3, this.snakePos.y),
    new Number2(this.snakePos.x + 4, this.snakePos.y)
  ];
  // tail length
  private tail: number = 4;
  private targetImgLoaded!: HTMLImageElement;
  private gameAreaImgLoaded!: HTMLImageElement;
  private snakeHeadImgLoaded!: HTMLImageElement;
  private snakeBodyImgLoaded: HTMLImageElement | undefined;

  private TOTAL_IMAGES: number = 3;
  private counterLoaded: number = 0;

  public allImagesLoaded: boolean = false;
  public score: number = 0;

  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
  private fpsInterval: number;
  private now: number;
  private then: number;
  private elapsed: number;
  private currentAnimationFrameRequest: number;

  private startedMoving: boolean = false;

  constructor() {
    // the bind is necessary to keep track of correct, common game state
    this.keyPush = this.keyPush.bind(this);
    this.game = this.game.bind(this);
    this.checkCollisionWithWall = this.checkCollisionWithWall.bind(this);
    this.checkCollisionWithSelf = this.checkCollisionWithSelf.bind(this);
    this.checkGameOver = this.checkGameOver.bind(this);
    this.startGameAndRender = this.startGameAndRender.bind(this);
    document.addEventListener('keydown', this.keyPush);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes.targetUrl && this.targetUrl)
      || (changes.snakeHeadUrl && this.snakeHeadUrl)
      || (changes.gameAreaUrl && this.gameAreaUrl)) {
      this.fillStyles();
    }
  }

  private cleanUp(): void {
    this.completed.complete();
    // console.log('cleaning up...');
    window.cancelAnimationFrame(this.currentAnimationFrameRequest);
    document.removeEventListener('keydown', this.keyPush);
  }

  private startAnimating(): void {
    this.fpsInterval = 1000 / this.fps;
    this.then = window.performance.now();
    this.startGameAndRender();
  }

  private startGameAndRender(newtime?: number): number {
    // request another frame;
    const anotherNewTime = window.requestAnimationFrame(this.startGameAndRender);
    // calc elapsed time since last loop
    this.now = newtime as number;
    this.elapsed = this.now - this.then;
    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      // draw
      if (this.startedMoving) {
        this.game();
      }
      this.render();
    }
    this.currentAnimationFrameRequest = anotherNewTime;
    return this.currentAnimationFrameRequest;
  }

  private checkCollisionWithWall(): boolean {
    // console.log('did i collide with wall?, ', ((this.snakePos.x < 0)
    //   || (this.snakePos.x > this.numberOfCellsInBoard)
    //   || (this.snakePos.y < 0)
    //   || (this.snakePos.y > this.numberOfCellsInBoard)) );
    return ((this.snakePos.x < 0)
      || (this.snakePos.x > this.numberOfCellsInBoard)
      || (this.snakePos.y < 0)
      || (this.snakePos.y > this.numberOfCellsInBoard));
  }

  private checkCollisionWithSelf(): boolean {
    // console.log('did i collide with self?, ', this.trail.some(snakePart => snakePart.equals(this.snakePos)));
    return this.trail.some(snakePart => snakePart.equals(this.snakePos));
  }

  private checkFoodCollisionWithSelf(currentFoodPosition: Number2): boolean {
    return this.trail.some(snakePart => snakePart.equals(currentFoodPosition));
  }

  private checkGameOver(): boolean {
    return this.checkCollisionWithWall() || this.checkCollisionWithSelf();
  }

  private game(): void {
    // update snake
    this.trail.push(new Number2(this.snakePos.x, this.snakePos.y));
    // head is one step ahead, if a  is any part of the trail means it went back
    this.snakePos.add(this.velocity);

    if (this.checkGameOver() && this.startedMoving) {
      // then disable controls
      this.completed.emit(false);
      this.cleanUp();
    }

    // remove extra tail pieces, tail is what u have eaten, keep consistent
    while (this.startedMoving && this.trail.length > this.tail) {
      this.trail.shift();
    }

    // update target check eat food
    if (this.foodPosition.equals(this.snakePos)) {
      this.tail += this.rateOfExpansion;
      this.score += 1;
      if (this.score === this.targetsToWin) {
        // end game
        // console.log('You have won, directing you to your rewards');
        this.completed.emit(true);
        this.cleanUp();
      }
      this.foodPosition.randomize(this.numberOfCellsInBoard);
      while (this.checkFoodCollisionWithSelf(this.foodPosition)) {
        this.foodPosition.randomize(this.numberOfCellsInBoard);
      }
    }
  }

  private render(): void {
    // render board
    this.ctx.drawImage(this.gameAreaImgLoaded, 0, 0, this.canv.width, this.canv.height);
    // render snake
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.trail.length; i++) {
      this.ctx.drawImage((i === this.trail.length - 1 ? this.snakeHeadImgLoaded : this.snakeBodyImgLoaded || this.snakeHeadImgLoaded),
        this.trail[i].x * this.cellSize, this.trail[i].y * this.cellSize, this.cellSize - 2 , this.cellSize - 2);
    }
    this.ctx.drawImage(this.targetImgLoaded,
      this.foodPosition.x * this.cellSize, this.foodPosition.y * this.cellSize, this.cellSize - 2, this.cellSize - 2);

  }

  private onloadCallBack(): null | undefined {
    this.counterLoaded++;
    if (this.counterLoaded < this.TOTAL_IMAGES) {
      return null;
    }
    // trigger start animation if is the last image
    this.startAnimating();
  }

  private fillStyles(): void {
    this.targetImgLoaded = getImageCors(this.targetUrl);
    this.gameAreaImgLoaded = getImageCors(this.gameAreaUrl);
    this.snakeHeadImgLoaded = getImageCors(this.snakeHeadUrl);
    if (this.snakeBodyUrl) {
      this.TOTAL_IMAGES += 1;
      this.snakeBodyImgLoaded = getImageCors(this.snakeBodyUrl);
      this.snakeBodyImgLoaded.onload = this.onloadCallBack.bind(this);
    }
    this.targetImgLoaded.onload = this.onloadCallBack.bind(this);
    this.gameAreaImgLoaded.onload = this.onloadCallBack.bind(this);
    this.snakeHeadImgLoaded.onload = this.onloadCallBack.bind(this);
  }

  // check boolean here necessary for touch controls, keyPush takes care of keyboard controls
  public down(): void {
    if (this.velocity.y === 0 && this.enabled) {
      this.velocity.x = 0;
      this.velocity.y = this.speed;
    }
  }

  public up(): void {
    if (this.velocity.y === 0 && this.enabled) {
      this.velocity.x = 0;
      this.velocity.y = -this.speed;
    }
  }
  public left(): void {
    if (this.velocity.x === 0 && this.enabled) {
      this.velocity.x = -this.speed;
      this.velocity.y = 0;
    }
  }

  public right(): void {
    if (this.velocity.x === 0 && this.enabled) {
      this.velocity.x = this.speed;
      this.velocity.y = 0;
    }
  }

  private keyPush(evt: KeyboardEvent): void {
    if (this.enabled) {
      switch (evt.key) {
        case 'ArrowLeft':
          if (!this.startedMoving) {
            this.startedMoving = true;
            this.trail = []; // so i wont slip over myself
          }
          this.left();
          break;
        case 'ArrowUp':
          if (!this.startedMoving) {
            this.startedMoving = true;
            this.trail = []; // so i wont slip over myself
          }
          this.up();
          break;
        case 'ArrowRight':
          if (!this.startedMoving) {
            this.startedMoving = true;
            this.trail = []; // so i wont slip over myself
          }
          this.right();
          break;
        case 'ArrowDown':
          if (!this.startedMoving) {
            this.startedMoving = true;
            this.trail = []; // so i wont slip over myself
          }
          this.down();
          break;
      }
    }
  }

}
