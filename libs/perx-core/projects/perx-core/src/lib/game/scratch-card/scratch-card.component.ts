import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';

interface Coords {
  x: number;
  y: number;
}

const RADIUS: number = 10;

@Component({
  selector: 'perx-core-scratch-card',
  templateUrl: './scratch-card.component.html',
  styleUrls: ['./scratch-card.component.scss']
})
export class ScratchCardComponent implements AfterViewInit {
  @Input()
  public coverImg: string;

  @Input()
  public underlyingImg: string;

  @Input()
  public uncoverPortionToTrigger: number = 90;

  @Input()
  public enabled: boolean = true;

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('js_container', { static: false }) public scContainer: ElementRef;
  @ViewChild('under_img', { static: false }) public underImg: ElementRef;

  private static brush: string = 'data:image/png;base64,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';

  public canvas: HTMLCanvasElement;
  public brush: HTMLImageElement;
  public lastPoint: Coords;
  public canvasWidth: string;
  public canvasHeight: string;
  private isDrawing: boolean;

  public get lastPointOffset(): Coords {
    const randomPoint = this.randomPoint(RADIUS);
    return {
      x: (this.lastPoint.x - RADIUS) + randomPoint.x,
      y: (this.lastPoint.y - RADIUS) + randomPoint.y,
    };
  }

  private randomPoint(radius: number): Coords {
    const angle: number = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  }

  private scratch(e: TouchEvent | MouseEvent, lastPoint: Coords = this.lastPoint): void {
    if (!this.isDrawing || !this.enabled || !this.canvas) {
      return;
    }

    e.preventDefault();

    const currentPoint: Coords = this.getMouse(e, this.canvas);
    const dist: number = this.distanceBetween(lastPoint, currentPoint);
    const angle: number = this.angleBetween(lastPoint, currentPoint);

    let x: number;
    let y: number;
    const canvas2dContext = this.canvas.getContext('2d');
    if (canvas2dContext) {
      for (let i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        canvas2dContext.globalCompositeOperation = 'destination-out';
        canvas2dContext.drawImage(this.brush, x, y);
      }
    }
    if (this.lastPoint === lastPoint) {
      this.lastPoint = currentPoint;
    }
    const constFilledInPixels = this.getFilledInPixels(32);
    if (constFilledInPixels) {
      this.handlePercentage(constFilledInPixels);
    }
  }

  public ngAfterViewInit(): void {
    this.generateCanvas();

    const image: HTMLImageElement = new Image();
    this.brush = new Image();
    const container = this.scContainer.nativeElement;

    // the crossOrigin flag needs to be setup before src otherwise it is too late
    image.crossOrigin = 'Anonymous';
    image.src = this.patchUrl(this.coverImg);
    const canvas2dContext = this.canvas.getContext('2d');
    image.onload = () => {
      if (this.canvas && canvas2dContext) {
        canvas2dContext.imageSmoothingEnabled = false;
        canvas2dContext.drawImage(image, 0, 0, container.offsetWidth, container.offsetHeight);
      }
      // Show the form when Image is loaded.
      this.underImg.nativeElement.style.visibility = 'visible';
    };

    this.brush.crossOrigin = 'anonymous';
    this.brush.src = ScratchCardComponent.brush;
    if (this.canvas) {
      this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
      this.canvas.addEventListener('touchstart', this.handleMouseDown.bind(this), false);
      this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
      this.canvas.addEventListener('touchmove', this.handleMouseMove.bind(this), false);
      this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this), false);
      this.canvas.addEventListener('touchend', this.handleMouseUp.bind(this), false);
    }
  }

  private patchUrl(url: string): string {
    const mappings = [
      { s3: 'perx-cdn-staging.s3.amazonaws.com', cdn: 'cdn.getperx.io' },
      { s3: 'perx-cdn.s3.amazonaws.com', cdn: 'cdn.getperx.com' }
    ];
    mappings.forEach(mapping => url = url.replace(mapping.s3, mapping.cdn));
    return url;
  }

  private generateCanvas(): void {
    this.canvas = document.createElement('canvas');
    if (this.canvas) {
      this.canvas.classList.add('canvas');

      // Add canvas into container
      this.canvas.width = this.scContainer.nativeElement.offsetWidth;
      this.canvas.height = this.scContainer.nativeElement.offsetHeight;
      this.scContainer.nativeElement.appendChild(this.canvas);
    }
  }

  public distanceBetween(point1: Coords, point2: Coords): number {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }

  public angleBetween(point1: Coords, point2: Coords): number {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  }

  public getFilledInPixels(stride: number): number {
    if (!this.canvas) {
      return 0;
    }

    const canvas2dContext = this.canvas.getContext('2d');
    if (!canvas2dContext) {
      return 0;
    }
    if (!stride || stride < 1) { stride = 1; }
    const pixels = canvas2dContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const pdata = pixels.data;
    const l = pdata.length;
    const total = (l / stride);
    let count = 0;

    // Iterate over all pixels
    for (let i = 0; i < l; i += stride) {
      if (pdata[i] === 0) {
        count++;
      }
    }
    return Math.round((count / total) * 100);
  }

  private getMouse(e: TouchEvent | MouseEvent, canvas: HTMLElement): Coords {
    let offsetX: number = 0;
    let offsetY: number = 0;

    while (canvas) {
      offsetY += canvas.offsetTop;
      offsetX += canvas.offsetLeft;
      canvas = canvas.offsetParent as HTMLElement;
    }

    const x = e instanceof MouseEvent ? e.pageX : e.touches[0].clientX;
    const y = e instanceof MouseEvent ? e.pageY : e.touches[0].clientY;
    const mx = x - offsetX;
    const my = y - offsetY;

    return { x: mx, y: my };
  }

  public handlePercentage(filledInPixels: number): void {
    const cont = document.getElementById('js_container');
    filledInPixels = filledInPixels || 0;
    // console.log(filledInPixels + '%');
    if (this.isDrawing && filledInPixels > this.uncoverPortionToTrigger && (cont as HTMLElement).children.length > 1 && this.canvas) {
      this.isDrawing = false;
      this.completed.emit();
    }
  }

  public handleMouseDown(e: TouchEvent | MouseEvent): void {
    this.isDrawing = true;
    this.lastPoint = this.getMouse(e, this.canvas);
    this.scratch(e, this.lastPointOffset);
  }

  public handleMouseMove(e: TouchEvent | MouseEvent): void {
    this.scratch(e);
  }

  private handleMouseUp(): void {
    this.isDrawing = false;
  }
}
