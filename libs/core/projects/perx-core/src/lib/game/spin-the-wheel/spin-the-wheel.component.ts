import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ISlice } from '../game.model';
import { loadImage } from '../../utils/load-image.function';

interface ImageForPattern {
  id: string;
  image: HTMLImageElement;
}

interface Pattern {
  id: string;
  width: number;
  height: number;
  pattern: CanvasPattern;
}

@Component({
  selector: 'perx-core-spin-the-wheel',
  templateUrl: './spin-the-wheel.component.html',
  styleUrls: ['./spin-the-wheel.component.scss']
})
export class SpinTheWheelComponent implements AfterViewInit, OnChanges {
  @Input()
  public enabled: boolean = true;

  @Input()
  public slices: ISlice[] = [];

  @Input()
  public spinDuration: number = 5000;

  @Input()
  public wheelImg: string | undefined;

  @Input()
  public pointerImg: string | undefined;

  @Input()
  public classPosition: string | undefined;

  @Input()
  public willWin: boolean = false;

  @Input()
  public rewardSlots: number[] = []; // to loop through for function below to find slot

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();

  // tslint:disable-next-line:variable-name
  private ctx_: CanvasRenderingContext2D | undefined;
  private patterns: Pattern[] = [];
  private arcDeg: number = 360; // degrees
  private currentRotationAngleRad: number = 0; // radian
  private spinTime: number = 0; // ms
  private targetAngleDeg: number; // degrees
  private lastTimeStamp: number = 0;
  private dragging: boolean = false;
  private spinTimeoutId: number;
  private wheelImgElt: HTMLImageElement | null = null;
  private slotToLand: number; // moved in, since it needs to be changed dynamically instd of pipe
  private REFRESH_PERIOD: number = 20; // target 50FPS

  @ViewChild('canvas', { static: true })
  private canvasEl: ElementRef<HTMLCanvasElement>;
  @ViewChild('wheel', { static: true })
  private wheelEl: ElementRef<HTMLDivElement>;

  private get canvas(): HTMLCanvasElement { return this.canvasEl.nativeElement; }
  private get wheel(): HTMLDivElement { return this.wheelEl.nativeElement; }
  private get arcRad(): number { return this.arcDeg * Math.PI / 180; }
  private get currentRotationAngleDeg(): number { return this.currentRotationAngleRad * 180 / Math.PI; }
  private get size(): number {
    return this.wheel.offsetWidth;
  }
  private get ctx(): CanvasRenderingContext2D {
    if (!this.ctx_ && this.canvas.getContext) {
      this.ctx_ = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }
    // @ts-ignore
    return this.ctx_;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes.slices && this.slices)
      || (changes.rewardSlots && this.rewardSlots)
      || (changes.wheelImg && this.wheelImg)
      || (changes.pointerImg && this.pointerImg)
      || (changes.willWin)) {
      this.init();
    }
  }

  public ngAfterViewInit(): void {
    this.initCanvas();
    this.attachListeners();
    this.drawWheel();
  }

  private initCanvas(): void {
    this.canvas.width = this.size;
    this.canvas.height = this.size;
  }

  private attachListeners(): void {
    this.canvas.style.cursor = 'move';
    this.canvas.addEventListener('touchstart', this.handleStart.bind(this), { once: true });
    this.canvas.addEventListener('mousedown', this.handleStart.bind(this), { once: true });

    // listen while dragging
    this.canvas.addEventListener('touchend', this.handleEnd.bind(this), { once: true });
    this.canvas.addEventListener('mouseup', this.handleEnd.bind(this), { once: true });

    // listen after dragging is complete
    this.canvas.addEventListener('touchmove', this.handleMove.bind(this), { once: true });
    this.canvas.addEventListener('mousemove', this.handleMove.bind(this), { once: true });
  }

  private determineSlot(): number {
    let noRewardsSlots: number[] = [...Array(this.slices.length).keys()].filter(item => !this.rewardSlots.includes(item));
    let targetSlots: number[];
    if(this.willWin && this.rewardSlots.length > 0) {
      targetSlots = this.rewardSlots;
    } else {
      targetSlots = noRewardsSlots;
    }
  
    const landedSlot = Math.floor(Math.random() * targetSlots.length);
    return targetSlots[landedSlot]; // get a random number out of the reward slots
  }

  private init(): void {
    this.arcDeg = 360 / this.slices.length;
    // Remove random initial point to avoid one load play and the wheel has different start point
    this.currentRotationAngleRad = 0;
    this.slotToLand = this.determineSlot();
    const angleNeeded = this.getTargetAngle(this.slotToLand);

    this.spinTimeoutId = 0;
    const nbRounds = Math.floor(Math.random() * 5) + 5;
    // the latter part after angleToBeSpun makes it spin for x amt more rounds;
    this.targetAngleDeg = angleNeeded + nbRounds * 360;
    this.loadImg();
  }

  private loadImg(): void {
    this.fillWheelWrapStyle();
    const promises: Promise<ImageForPattern>[] = this.slices
      .filter(item => item.backgroundImage)
      .map((item) => loadImage(item.backgroundImage as string)
        .then((image: HTMLImageElement) => ({ id: item.id, image }))
      );
    Promise.all(promises).then((images: ImageForPattern[]) => {
      this.createPatterns(images);
      this.drawWheel();
    });
  }

  private createPatterns(arr: ImageForPattern[]): void {
    this.patterns = arr
      .filter(({ id, image }) => id && image)
      .map(item => ({
        id: item.id,
        width: item.image.width,
        height: item.image.height,
        pattern: this.ctx && this.ctx.createPattern(item.image, 'no-repeat')
      }))
      .filter((imagePattern) => imagePattern.pattern !== null) as Pattern[];
  }

  private drawWheel(): void {
    if (this.size === 0) {
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.size / 2, this.size / 2);
    this.ctx.rotate(this.currentRotationAngleRad);

    // draw the wheel
    if (this.wheelImgElt) {
      this.ctx.save();
      // move back to the rotated origin
      this.ctx.translate(-(this.canvas.width / 2), -(this.canvas.height / 2));
      // draw the wheel
      this.ctx
        .drawImage(
          this.wheelImgElt,
          0, 0,
          this.canvas.width, this.canvas.height
        );
      this.ctx.restore();
    }

    // TODO get rid of magical number
    const sliceRadius = (this.size / 2.2) - 5;

    // render slices
    this.slices.forEach((slice: ISlice, i: number) => {
      const angle = i * this.arcRad;
      // render background color
      this.ctx.fillStyle = slice.backgroundColor || 'white';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, sliceRadius, angle, angle + this.arcRad, false);
      this.ctx.arc(0, 0, 0, angle + this.arcRad, angle, true);

      this.ctx.stroke();
      this.ctx.fill();
      // render background images
      if (slice.backgroundImage) {
        const currentPattern: Pattern | undefined = this.patterns.find(item => item.id === slice.id);
        if (currentPattern) {
          this.ctx.save();
          this.ctx.rotate(angle + this.arcRad / 2);

          // this is the maximal size to fit the stamp into the slice
          const stampSize: number = sliceRadius / Math.sqrt((1 / (2 * Math.tan(this.arcRad / 2)) + 1) ** 2 + 1 / 4);
          const ratio = stampSize / Math.max(currentPattern.width, currentPattern.height);
          const stampInnerRadius = stampSize * .5 / Math.tan(this.arcRad / 2);

          this.ctx.translate(stampInnerRadius, -stampSize / 2);

          this.ctx.fillStyle = currentPattern.pattern;
          this.ctx.beginPath();
          this.ctx.scale(ratio, ratio);
          this.ctx.rect(0, 0, currentPattern.width, currentPattern.height);
          this.ctx.fill();
          this.ctx.restore();
        }
      }

      // render labels
      if (slice.label) {
        this.ctx.save();
        this.ctx.shadowOffsetX = -1;
        this.ctx.shadowOffsetY = -1;
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = slice.labelColor || 'black';

        this.ctx.rotate(angle + this.arcRad / 2);
        this.ctx.translate(this.size / 4, 0);
        this.ctx.font = 'bold 15px Helvetica, Arial';

        const text = slice.label || '';

        const textArray = text.split(' ');
        for (let index = 0; index < textArray.length; index++) {
          const element = textArray[index];
          this.ctx.fillText(
            element,
            -this.ctx.measureText(element).width / 2,
            index * 15
          );
        }
        this.ctx.restore();
      }
    });
    this.ctx.resetTransform();
  }

  private fillWheelWrapStyle(): void {
    if (this.wheelImg === undefined) {
      return;
    }
    loadImage(this.wheelImg)
      .then((wheelImg: HTMLImageElement) => {
        if (this.wheelImgElt !== wheelImg) {
          this.wheelImgElt = wheelImg;
          this.drawWheel();
        }
      });
  }

  private getTargetAngle(neededIndex: number): number {
    // randomize the result within the target slice
    const v = (neededIndex + Math.random()) * this.arcDeg;
    // pointer is at the top, not at 0, therefore we add 270
    return - v + 270;
  }

  private spin(): void {
    this.spinTime = 0;
    this.lastTimeStamp = (new Date()).getTime();
    this.rotateWheel();
  }

  private rotateWheel(): void {
    const time = (new Date()).getTime();
    const deltaT = time - this.lastTimeStamp;
    this.spinTime += deltaT;
    this.lastTimeStamp = time;
    if (this.spinTime >= this.spinDuration) {
      this.stopRotateWheel();
      this.completed.emit();
      return;
    }
    const spinAngle: number =
      SpinTheWheelComponent.easeOut(this.spinTime, this.currentRotationAngleDeg, this.targetAngleDeg, this.spinDuration);
    this.currentRotationAngleRad = spinAngle * Math.PI / 180;
    this.drawWheel();
    this.spinTimeoutId = window.setTimeout(() => this.rotateWheel(), this.REFRESH_PERIOD);
  }

  private stopRotateWheel(): void {
    clearTimeout(this.spinTimeoutId);
    this.ctx.save();
    this.ctx.font = 'bold 20px Helvetica, Arial';
    this.ctx.fillStyle = 'black';
    const text = this.slices[this.slotToLand].label || '';
    this.ctx.fillText(
      text,
      this.size / 2 - this.ctx.measureText(text).width / 2,
      this.size / 2 + 10
    );
    this.ctx.restore();
  }

  private handleStart(): void {
    if (!this.enabled) {
      return;
    }
    this.dragging = true;
  }

  private handleMove(e: MouseEvent): void {
    if (!this.enabled) {
      return;
    }
    if (this.dragging) {
      // get the center of the wheel as an array of [x, y]
      const targetCenter = [
        SpinTheWheelComponent.findLeft(this.canvas) + this.canvas.offsetWidth / 2,
        SpinTheWheelComponent.findTop(this.canvas) + this.canvas.offsetHeight / 2
      ];

      // get the angle needed to rotate the wheel to follow the mouse/touch
      const angle = Math.round(
        Math.atan2(e.pageX - targetCenter[0], -(e.pageY - targetCenter[1])) * (180 / Math.PI)
      );

      // add css to rotate
      let styleString = '';
      styleString += `-webkit-transform: rotate(${angle}deg);`;
      styleString += `-moz-transform: rotate(${angle}deg);`;
      styleString += `transform: rotate(${angle}deg);`;

      this.canvas.setAttribute('style', styleString);
    }
    e.preventDefault();
  }

  private handleEnd(): void {
    if (!this.enabled) {
      return;
    }
    // set the dragging to false
    this.dragging = false;

    // create css to rotate the wheel back to how it was
    const degree = 0;
    let styleString = '';
    styleString += `-moz-transform: rotate(${degree}deg);`;
    styleString += '-moz-transform-origin: 50% 50%;';
    styleString += `-webkit-transform: rotate(${degree}deg);`;
    styleString += '-webkit-transform-origin: 50% 50%;';
    styleString += `-o-transform: rotate(${degree}deg);`;
    styleString += '-o-transform-origin: 50% 50%;';
    styleString += `-ms-transform: rotate(${degree}deg);`;
    styleString += '-ms-transform-origin: 50% 50%;';

    this.canvas.setAttribute('style', styleString);

    this.spin();
  }

  private static findTop(element: HTMLElement): number {
    const rec = element.getBoundingClientRect();
    return rec.top + window.scrollY;
  }

  private static findLeft(element: HTMLElement): number {
    const rec = element.getBoundingClientRect();
    return rec.left + window.scrollX;
  }

  /**
   * @param t current time
   * @param b start value
   * @param c target value
   * @param d total time
   */
  private static easeOut(t: number, b: number, c: number, d: number): number {
    // todo improve this updateFactor and avoid magic number
    const updateFactor = (t / d) * .2;
    return b + (c - b) * updateFactor;
  }
}
