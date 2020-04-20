import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { getImageCors } from '../../utils/getImageCors';
import { patchUrl } from '../../utils/patch-url.function';
import { ISlice } from '../game.model';

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
  public spinDuration: number = 2;

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
  private arcDeg: number = 360;
  private startAngle: number = 0;
  private patterns: Pattern[] = [];
  private spinTime: number;
  private dragging: boolean = false;
  private spinTimeTotal: number = 0;
  private spinAngleStart: number = 0;
  private spinTimeout: number;
  private wheelImgElt: HTMLImageElement | null = null;
  private angleToBeSpun: number;
  private slotToLand: number; // moved in, since it needs to be changed dynamically instd of pipe

  @ViewChild('canvas', { static: true })
  private canvasEl: ElementRef<HTMLCanvasElement>;
  @ViewChild('wheel', { static: true })
  private wheelEl: ElementRef<HTMLDivElement>;

  private get canvas(): HTMLCanvasElement { return this.canvasEl.nativeElement; }
  private get wheel(): HTMLDivElement { return this.wheelEl.nativeElement; }
  private get arc(): number { return this.arcDeg * Math.PI / 180; }
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
    if (this.willWin) {
      const landedSlot = Math.floor(Math.random() * this.rewardSlots.length);
      return this.rewardSlots[landedSlot]; // w // get a random number out of the reward slots
    }
    // RESERVE 0 as non-winning slot ***
    return 0;
  }

  private init(): void {
    this.arcDeg = 360 / this.slices.length;
    this.startAngle = this.arc / 2;
    this.slotToLand = this.determineSlot();
    const angleNeeded = this.getAngleNeeded(this.slotToLand);

    this.spinTimeout = 0;
    // the latter part after angleToBeSpun makes it spin for x amt more rounds;
    this.angleToBeSpun = angleNeeded + (Math.floor(Math.random() * 5) + 1) * 360;
    this.loadImg();
  }

  private loadImg(): void {
    const slicesWithImg: ISlice[] = this.slices.filter(item => item.backgroundImage);
    let count: number = 0;
    const images: ImageForPattern[] = [];

    this.fillWheelWrapStyle();

    slicesWithImg.forEach((item) => {
      const image: HTMLImageElement = getImageCors(patchUrl(item.backgroundImage as string));
      images.push({ id: item.id, image });
      image.onload = () => {
        count++;
        if (count === slicesWithImg.length) {
          this.createPatterns(images);
          this.drawWheel();
        }
      };
    });
    if (slicesWithImg.length === 0) {
      this.drawWheel();
    }
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.size / 2, this.size / 2);
    this.ctx.rotate(this.startAngle);

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
      const angle = i * this.arc;
      // render background color
      this.ctx.fillStyle = slice.backgroundColor || 'white';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, sliceRadius, angle, angle + this.arc, false);
      this.ctx.arc(0, 0, 0, angle + this.arc, angle, true);

      this.ctx.stroke();
      this.ctx.fill();
      // render background images
      if (slice.backgroundImage) {
        const currentPattern: Pattern | undefined = this.patterns.find(item => item.id === slice.id);
        if (currentPattern) {
          this.ctx.save();
          this.ctx.rotate(angle + this.arc / 2);

          // this is the maximal size to fit the stamp into the slice
          const stampSize: number = sliceRadius / Math.sqrt((1 / (2 * Math.tan(this.arc / 2)) + 1) ** 2 + 1 / 4);
          const ratio = stampSize / Math.max(currentPattern.width, currentPattern.height);

          const patternInnerRadius = stampSize * .5 / Math.tan(this.arc / 2);
          this.ctx.translate(patternInnerRadius, -stampSize / 2);

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

        this.ctx.rotate(angle + this.arc / 2);
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
    const wheelImg: HTMLImageElement = getImageCors(patchUrl(this.wheelImg));
    wheelImg.onload = () => {
      if (this.wheelImgElt !== wheelImg) {
        this.wheelImgElt = wheelImg;
        this.drawWheel();
      }
    };
  }

  private getAngleNeeded(neededIndex: number): number {
    const degrees = this.startAngle * 180 / Math.PI + 90;
    let arcd = this.arcDeg;
    const currentIndex = Math.floor((360 - degrees % 360) / arcd);
    if (this.slices.length === 6) {
      arcd -= 10;
    }

    if (this.slices.length === 9) {
      arcd -= 4;
    }

    if (this.slices.length === 10) {
      arcd -= 4;
    }
    if (currentIndex === neededIndex) {
      return 0;
    }
    if (currentIndex > neededIndex) {
      return arcd * (currentIndex - neededIndex);
    }
    return arcd * (currentIndex + this.slices.length - neededIndex);
  }

  private spin(): void {
    // TODO stop magic number
    this.spinAngleStart = this.angleToBeSpun / 32.807503994186335;
    this.spinTime = 0;
    // TODO stop magic number
    this.spinTimeTotal = this.spinDuration * 3 + 4000;
    this.rotateWheel();
  }

  private rotateWheel(): void {
    // TODO stop magic number
    this.spinTime += 30;
    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      this.completed.emit();
      return;
    }
    const spinAngle: number =
      this.spinAngleStart -
      SpinTheWheelComponent.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    this.startAngle += spinAngle * Math.PI / 180;
    this.drawWheel();
    const that = this;
    this.spinTimeout = window.setTimeout(() => {
      that.rotateWheel();
    }, 15); // TODO stop magic number
  }

  private stopRotateWheel(): void {
    clearTimeout(this.spinTimeout);
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

  // TODO what are those parameters
  private static easeOut(t: number, b: number, c: number, d: number): number {
    const ts = (t /= d) * t;
    const tc = ts * t;
    // TODO stop magic number
    return b + c * (tc + -3 * ts + 3 * t);
  }
}
