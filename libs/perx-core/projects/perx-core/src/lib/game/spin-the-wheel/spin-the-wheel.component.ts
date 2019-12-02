import {Component, Input, OnChanges, AfterViewInit, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
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
export class SpinTheWheelComponent implements AfterViewInit, OnChanges {
  @Input()
  public slices: ISlice[] = [];

  @Input()
  public spinDuration: number = 3;

  @Input()
  public wheelImg: string;

  @Input()
  public pointerImg: string;

  @Input()
  public classPosition: string;

  // tslint:disable-next-line:variable-name
  private ctx_: CanvasRenderingContext2D;
  // tslint:disable-next-line:variable-name
  private ctxArrow_: CanvasRenderingContext2D;
  // tslint:disable-next-line:variable-name
  private ctxWheelWrap_: CanvasRenderingContext2D;
  private arcDeg: number;
  private arc: number;
  private startAngle: number;
  public size: number;
  private patternImg: Pattern[] = [];
  private spinTime: number;
  private dragging: boolean = false;
  private spinTimeTotal: number = 0;
  private spinAngleStart: number = 0;
  private spinTimeout: number;
  private wheelImgLoaded!: HTMLImageElement;

  @ViewChild('canvas', {static: true})
  private canvasEl: ElementRef<HTMLCanvasElement>;
  @ViewChild('arrow', {static: true})
  private canvasArrowEl: ElementRef<HTMLCanvasElement>;
  @ViewChild('wheelWrap', {static: true})
  private canvasWheelWrapEl: ElementRef<HTMLCanvasElement>;
  @ViewChild('wheel', {static: true})
  private wheelEl: ElementRef<HTMLDivElement>;
  @ViewChild('container', {static: true})
  private containerEl: ElementRef<HTMLDivElement>;

  private get canvas(): HTMLCanvasElement { return this.canvasEl.nativeElement; }
  private get canvasArrow(): HTMLCanvasElement { return this.canvasArrowEl.nativeElement; }
  private get canvasWheelWrap(): HTMLCanvasElement { return this.canvasWheelWrapEl.nativeElement; }

  private get wheel(): HTMLDivElement { return this.wheelEl.nativeElement; }
  private get container(): HTMLDivElement { return this.containerEl.nativeElement; }

  private get ctx(): CanvasRenderingContext2D {
    if (!this.ctx_ && this.canvas.getContext) {
      this.ctx_ = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }
    return this.ctx_;
  }

  private get ctxArrow(): CanvasRenderingContext2D {
    if (!this.ctxArrow_ && this.canvasArrow.getContext) {
      this.ctxArrow_ = this.canvasArrow.getContext('2d') as CanvasRenderingContext2D;
    }
    return this.ctxArrow_;
  }

  private get ctxWheelWrap(): CanvasRenderingContext2D {
    if (!this.ctxWheelWrap_ && this.canvasWheelWrap.getContext) {
      this.ctxWheelWrap_ = this.canvasWheelWrap.getContext('2d') as CanvasRenderingContext2D;
    }
    return this.ctxWheelWrap_;
  }

  private static findTop(element: HTMLElement): number {
    const rec = element.getBoundingClientRect();
    return rec.top + window.scrollY;
  }

  private static findLeft(element: HTMLElement): number {
    const rec = element.getBoundingClientRect();
    return rec.left + window.scrollX;
  }

  private static easeOut(t: number, b: number, c: number, d: number): number {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes.slices && this.slices)
      || (changes.wheelImg && this.wheelImg)
      || (changes.pointerImg && this.pointerImg)) {
      this.init();
    }
  }

  public ngAfterViewInit(): void {
    this.generateCanvas();
    this.attachListeners();
  }

  private generateCanvas(): void {
    this.size = this.wheel.offsetWidth;
    this.canvas.width = this.wheel.offsetWidth;
    this.canvas.height = this.wheel.offsetWidth;
    this.canvasArrow.width = this.wheel.offsetWidth;
    this.canvasArrow.height = this.wheel.offsetWidth;
    this.canvasWheelWrap.height = this.wheel.offsetWidth * 1.15;
    this.canvasWheelWrap.width =  this.wheel.offsetWidth * 1.15;
  }

  private attachListeners(): void {
    this.canvasArrow.style.cursor = 'move';
    this.canvasArrow.addEventListener('touchstart', this.handleStart.bind(this), false);
    this.canvasArrow.addEventListener('mousedown', this.handleStart.bind(this), false);

    // listen while dragging
    this.canvasArrow.addEventListener('touchend', this.handleEnd.bind(this), false);
    this.canvasArrow.addEventListener('mouseup', this.handleEnd.bind(this), false);

    // listen after dragging is complete
    this.canvasArrow.addEventListener('touchmove', this.handleMove.bind(this), false);
    this.canvasArrow.addEventListener('mousemove', this.handleMove.bind(this), false);
  }

  private init(): void {
    this.arcDeg = 360 / this.slices.length;
    this.startAngle = this.arcDeg / 2 * Math.PI / 180;
    this.arc = this.arcDeg * Math.PI / 180; // converting back to radians
    this.spinTimeout = 0;
    this.loadImg();
  }

  private loadImg(): void {
    const slicesWithImg: ISlice[] = this.slices.filter(item => item.backgroundImage);
    let count: number = 0;
    const images: ImageForPattern[] = [];

    this.fillArrowStyle();
    this.fillWheelWrapStyle();

    slicesWithImg.forEach((item) => {
      console.log('at least i enter4ed ehre laodImg loopigb thru saliceWithImage?');
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

  private createPatterns(arr: ImageForPattern[]): void {
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

  private drawWheel(): void {
    console.log('i am drawWheel and i am also being called');
    const outsideRadius = this.size / 2 - 5; // how does this come about ?
    this.ctx.translate(this.size / 2, this.size / 2);
    this.ctx.rotate(this.startAngle); // why have a start angle, just center it if dont have?
    // draw slices
    this.slices.forEach((slice: ISlice, i: number) => {
      const angle = i * this.arc;
      // render background color
      this.ctx.fillStyle = slice.backgroundColor || 'white';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, outsideRadius, angle, angle + this.arc, false);
      this.ctx.arc(0, 0, 0, angle + this.arc, angle, true);

      this.ctx.stroke();
      this.ctx.fill();
      // render background image
      if (slice.backgroundImage) {
        const currentPattern: Pattern | undefined = this.patternImg.find(item => item.id === slice.id);
        if (currentPattern) {
          this.ctx.save();
          this.ctx.rotate(angle  + this.arc / 2);

          const stampSize: number = 500 / this.slices.length; // *** dynamic rectangle
          this.ctx.translate(outsideRadius / 1.8,  - (Math.floor(outsideRadius / 5)) ); // 25 looks okay

          this.ctx.globalCompositeOperation = 'source-atop';

          this.ctx.fillStyle = currentPattern.pattern;
          this.ctx.beginPath();
          this.ctx.rect(0, 0 , stampSize, stampSize);
          this.ctx.fill();
          this.ctx.restore();
        } else {
          console.log('no pattern');
        }
      }

      if (this.wheelImgLoaded) {
        this.ctxWheelWrap.save();
        this.ctxWheelWrap.clearRect(0, 0, this.canvasWheelWrap.width, this.canvasWheelWrap.height);
        this.ctxWheelWrap.translate(this.canvasWheelWrap.width / 2, this.canvasWheelWrap.width / 2);
        this.ctxWheelWrap.rotate(Math.PI / 180 * (this.startAngle));
        this.ctxWheelWrap.translate(-(this.canvasWheelWrap.width / 2), -(this.canvasWheelWrap.width / 2));
        this.ctxWheelWrap
          .drawImage(this.wheelImgLoaded,
            0 , 0,
            this.canvasWheelWrap.width , this.canvasWheelWrap.height);
        this.ctxWheelWrap.restore();
      }

      // render label
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

  private fillArrowStyle(): void {
    const arrowImage: HTMLImageElement = new Image();
    arrowImage.src = this.pointerImg;
    arrowImage.onload = () => this.ctxArrow.drawImage(arrowImage, this.canvasArrow.width / 2 - 20, 0, 40, 50);
    if (this.ctxArrow) {
      this.ctxArrow.clearRect(0, 0, this.canvasArrow.width, this.canvasArrow.height);
      this.ctxArrow.fillStyle = (this.ctxArrow.createPattern(arrowImage, 'no-repeat') as CanvasPattern);
      this.ctxArrow.fill();
    }
  }

  private fillWheelWrapStyle(): void {
    const wheelImg: HTMLImageElement = new Image(); // this.canvasWheelWrap.width, this.canvasWheelWrap.height
    wheelImg.src = this.wheelImg; // this.wheelImg suppose
    wheelImg.onload = () => {
      if (this.wheelImgLoaded !== wheelImg) {
        this.wheelImgLoaded = wheelImg;
        this.ctxWheelWrap.clearRect(0, 0 , this.canvasWheelWrap.width, this.canvasWheelWrap.height); // critical to clear first to not ghost
        this.ctxWheelWrap
          .drawImage(this.wheelImgLoaded,
            0 , 0,
            this.canvasWheelWrap.width , this.canvasWheelWrap.height);
      }
    };
  }

  private spin(): void {
    this.spinAngleStart = Math.random() * 10 + 10;
    this.spinTime = 0;
    this.spinTimeTotal = this.spinDuration * 3 * 1000;
    this.rotateWheel();
  }

  private rotateWheel(): void {
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
  // draw wheel used to be here
    const that = this;
    this.spinTimeout = window.setTimeout(() => {
      that.rotateWheel();
    }, 30);
  }

  private stopRotateWheel(): void {
    if (!this.ctx) { return; }
    clearTimeout(this.spinTimeout); // think it has everything to do with this. timeout async thing messes up
    const degrees = this.startAngle * 180 / Math.PI + 180;
    const arcd = this.arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd); // this determines where ends
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

  private handleStart(): void {
    this.dragging = true;
  }

  private handleMove(e: any): void {
    if (this.dragging) {

      // get the center of the wheel as an array of [x, y]
      const targetCenter = [
        SpinTheWheelComponent.findLeft(this.container) + this.container.offsetWidth / 2,
        SpinTheWheelComponent.findTop(this.container) + this.container.offsetHeight / 2
      ];

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

      this.canvas.setAttribute('style', styleString);
    }
    e.preventDefault();
  }

  private handleEnd(): void {
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

    this.canvas.setAttribute('style', styleString);

    this.spin();
  }
}
