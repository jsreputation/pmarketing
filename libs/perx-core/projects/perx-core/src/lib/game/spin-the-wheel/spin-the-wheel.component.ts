import { Component, Input, OnInit } from '@angular/core';
import { ISlice } from '../game.model';

interface ImageForPattern {
  id: string;
  image: HTMLImageElement;
}

interface Pattern {
  id: string;
  pattern: CanvasPattern;
}

@Component({
  selector: 'perx-core-spin-the-wheel',
  templateUrl: './spin-the-wheel.component.html',
  styleUrls: ['./spin-the-wheel.component.scss']
})
export class SpinTheWheelComponent implements OnInit {
  @Input()
  public slices: ISlice[] = [];

  @Input()
  public spinDuration: number = 3;

  // tslint:disable-next-line:variable-name
  private ctx_: CanvasRenderingContext2D | null = null;
  public ctxArrow: CanvasRenderingContext2D | null;
  public canvas: HTMLCanvasElement;
  public canvasArrow: HTMLCanvasElement;
  public arcDeg: number;
  public arc: number;
  public startAngle: number;
  public patternImg: Pattern[];
  public spinTime: number;
  public dragging: boolean = false;
  public spinTimeTotal: number = 0;
  public spinAngleStart: number = 0;
  public spinTimeout: number;
  public size: number;

  private static easeOut(t: number, b: number, c: number, d: number): number {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  private static findTop(element: HTMLElement): number {
    const rec = element.getBoundingClientRect();
    return rec.top + window.scrollY;
  }

  private static findLeft(element: HTMLElement): number {
    const rec = element.getBoundingClientRect();
    return rec.left + window.scrollX;
  }

  public ngOnInit(): void {
    this.generateCanvas();
    this.init();
    this.attachListeners();
    console.log(this.slices);
  }

  public generateCanvas(): void {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'ng-wheel-canvas');

    this.canvasArrow = document.createElement('canvas');
    this.canvasArrow.setAttribute('id', 'wheel-canvas-stop');

    const parent: HTMLElement = document.getElementById('wheel') as HTMLElement;

    this.size = parent.offsetWidth;
    this.canvas.width = parent.offsetWidth;
    this.canvas.height = parent.offsetHeight;
    this.canvasArrow.width = parent.offsetWidth;
    this.canvasArrow.height = parent.offsetHeight;

    this.canvas.style.position = 'absolute';
    this.canvasArrow.style.position = 'absolute';

    parent.appendChild(this.canvas);
    parent.appendChild(this.canvasArrow);
  }

  public attachListeners(): void {
    const arrowCanvas = document.getElementById('wheel-canvas-stop') as HTMLCanvasElement;

    arrowCanvas.style.cursor = 'move';
    arrowCanvas.addEventListener('touchstart', this.handleStart.bind(this), false);
    arrowCanvas.addEventListener('mousedown', this.handleStart.bind(this), false);

    // listen while dragging
    arrowCanvas.addEventListener('touchend', this.handleEnd.bind(this), false);
    arrowCanvas.addEventListener('mouseup', this.handleEnd.bind(this), false);

    // listen after dragging is complete
    arrowCanvas.addEventListener('touchmove', this.handleMove.bind(this), false);
    arrowCanvas.addEventListener('mousemove', this.handleMove.bind(this), false);
  }

  private init(): void {
    this.arcDeg = 360 / this.slices.length;
    this.startAngle = this.arcDeg / 2 * Math.PI / 180;
    this.arc = this.arcDeg * Math.PI / 180;
    this.spinTimeout = 0;

    // tslint:disable-next-line: no-unused-expression
    this.ctx;
    this.loadImg();
  }

  private get ctx(): CanvasRenderingContext2D {
    if (this.ctx_ === null) {
      const canvas = document.getElementById('ng-wheel-canvas') as HTMLCanvasElement;
      if (canvas.getContext) {
        this.ctx_ = canvas.getContext('2d');
        this.loadImg();
      }
    }
    return (this.ctx_ as CanvasRenderingContext2D);
  }

  public loadImg(): void {
    const slicesWithImg: ISlice[] = this.slices.filter(item => item.backgroundImage);
    let count: number = 0;
    const images: ImageForPattern[] = [];

    if (slicesWithImg.length === 0) {
      this.drawWheel();
      return;
    }

    slicesWithImg.forEach((item) => {
      const image: HTMLImageElement = new Image();
      image.src = item.backgroundImage ? item.backgroundImage : '';
      images.push({ id: item.id, image });
      image.onload = () => {
        count++;
        if (count === slicesWithImg.length) {
          this.createPatterns(images);
        }
      };
    });
  }

  public createPatterns(arr: ImageForPattern[]): void {
    const patternImg = arr.filter(({id, image}) => id  && image)
      .map(item => (
        {
          id: item.id,
          pattern: this.ctx && this.ctx.createPattern(item.image, 'no-repeat')
        })).filter((imagePattern) => {
        if (imagePattern.pattern) {
          return imagePattern;
        }
      });
    this.patternImg = (patternImg as Pattern[]);
    this.drawWheel();
  }

  public drawWheel(): void {
    const outsideRadius = this.size / 2 - 5;
    const textRadius = this.size / 3;
    this.slices.forEach((slice: ISlice, i: number) => {
      if (this.ctx !== null) {
        const angle = this.startAngle + i * this.arc;

        if (slice.backgroundImage) {
          const currentPattern = this.patternImg.find(item => item.id === slice.id);
          if (currentPattern) {
            this.ctx.fillStyle = currentPattern.pattern;
          }
        } else {
          this.ctx.fillStyle = slice.backgroundColor || 'white';
        }

        this.ctx.beginPath();
        this.ctx.arc(this.size / 2, this.size / 2, outsideRadius, angle, angle + this.arc, false);
        this.ctx.arc(this.size / 2, this.size / 2, 0, angle + this.arc, angle, true);
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.save();
        this.ctx.shadowOffsetX = -1;
        this.ctx.shadowOffsetY = -1;
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = slice.labelColor || 'black';
        this.ctx.translate(
          this.size / 2 + Math.cos(angle + this.arc / 2) * textRadius,
          this.size / 2 + Math.sin(angle + this.arc / 2) * textRadius
        );
        this.ctx.rotate(angle + this.arc / 2 + Math.PI);
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

    const canvasArrow = document.getElementById('wheel-canvas-stop') as HTMLCanvasElement;
    if (canvasArrow.getContext) {
      this.ctxArrow = canvasArrow.getContext('2d');

      // Arrow
      if (this.ctxArrow) {
        this.ctxArrow.fillStyle = 'black';
        this.ctxArrow.beginPath();

        this.ctxArrow.moveTo(0, outsideRadius + 5);
        this.ctxArrow.lineTo(0, outsideRadius - 5);
        this.ctxArrow.lineTo(13, outsideRadius);
        this.ctxArrow.lineTo(0, outsideRadius + 5);

        this.ctxArrow.fill();
      }
    }
  }

  public spin(): void {
    this.spinAngleStart = Math.random() * 10 + 10;
    this.spinTime = 0;
    this.spinTimeTotal = this.spinDuration * 3 * 1000;
    this.rotateWheel();
  }

  public rotateWheel(): void {
    this.spinTime += 30;
    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
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
    }, 30);
  }

  public stopRotateWheel(): void {
    if (!this.ctx) { return; }
    clearTimeout(this.spinTimeout);
    const degrees = this.startAngle * 180 / Math.PI + 180;
    const arcd = this.arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    this.ctx.save();

    this.ctx.font = 'bold 20px Helvetica, Arial';
    this.ctx.fillStyle = 'black';
    const text = this.slices[index].label || '';
    this.ctx.fillText(
      text,
      this.size / 2 - this.ctx.measureText(text).width / 2,
      this.size / 2 + 10
    );
    this.ctx.restore();
  }

  public handleStart(): void {
    this.dragging = true;
  }

  public handleMove(e: any): void {
    if (this.dragging) {
      const container: HTMLElement | null = document.getElementById('container');

      // get the center of the wheel as an array of [x, y]
      const targetCenter = container ? [
        SpinTheWheelComponent.findLeft(container) + container.offsetWidth / 2,
        SpinTheWheelComponent.findTop(container) + container.offsetHeight / 2
      ] : [];

      // get the angle needed to rotate the wheel to follow the mouse/touch
      const angle = Math.round(
        Math.atan2(e.pageX || e.touches[0].clientX - targetCenter[0], -(e.pageY || e.touches[0].clientY - targetCenter[1])) *
        (180 / Math.PI)
      );

      // add css to rotate
      let styleString = '';
      styleString += '-webkit-transform: rotate(' + angle + 'deg);';
      styleString += '-moz-transform: rotate(' + angle + 'deg);';
      styleString += 'transform: rotate(' + angle + 'deg);';

      const canvas: HTMLElement | null = document.getElementById('ng-wheel-canvas');
      if (canvas) {
        canvas.setAttribute('style', styleString);
      }
    }
    e.preventDefault();
  }

  public handleEnd(): void {
    // set the dragging to false
    this.dragging = false;

    // create css to rotate the wheel back to how it was
    const degree = 0;
    let styleString = '';
    styleString += '-moz-transform: rotate(' + degree + 'deg);';
    styleString += '-moz-transform-origin: 50% 50%;';
    styleString += '-webkit-transform: rotate(' + degree + 'deg);';
    styleString += '-webkit-transform-origin: 50% 50%;';
    styleString += '-o-transform: rotate(' + degree + 'deg);';
    styleString += '-o-transform-origin: 50% 50%;';
    styleString += '-ms-transform: rotate(' + degree + 'deg);';
    styleString += '-ms-transform-origin: 50% 50%;';

    const canvas: HTMLElement | null = document.getElementById('ng-wheel-canvas');
    if (canvas) {
      canvas.setAttribute('style', styleString);
    }

    this.spin();
  }
}
