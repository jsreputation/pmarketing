import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';

interface DrawTile {
  puzzleLocation: number;
  isSelected: boolean;
}

@Component({
  selector: 'perx-core-puzzle-play',
  templateUrl: './puzzle-play.component.html',
  styleUrls: ['./puzzle-play.component.scss']
})
export class PuzzlePlayComponent implements OnInit {
  @Input()
  public img: string;

  @Input()
  public showHint: false = false;

  @Input()
  public rows: number = 2;

  @Input()
  public cols: number = 3;

  @Input()
  public nbPlayedPieces: number = 0;

  @Input()
  public nbAvailablePieces: number = 0;

  @Input()
  public puzzlePiecesText: () => Observable<string>;

  @Input()
  public collectPuzzleText: () => Observable<string>;

  @Input()
  public clickPuzzleText: () => Observable<string>;

  @Output()
  public moved: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();

  public tileWidth: number = 0;
  public tileHeight: number = 0;

  public boardPuzzleTiles: DrawTile[] = [];
  public remainingPuzzleTiles: DrawTile[] = [];

  public totalPieces: number;

  public imageWidth: number = 300;
  public imageHeight: number = 200;
  public imageReady: boolean = false;

  public staticPuzzleDummyTiles: number[][] = [];

  public get hasRemainingPuzzleTiles(): boolean {
    return this.remainingPuzzleTiles.length > 0;
  }

  @ViewChild('puzzleBoard', { static: false }) public puzzleView: ElementRef;

  public ngOnInit(): void {
    if (!this.puzzlePiecesText) {
      this.puzzlePiecesText = () => of('PUZZLE PIECES');
    }
    if (!this.collectPuzzleText) {
      this.collectPuzzleText = () => of('Collect pieces and complete the puzzle');
    }
    if (!this.clickPuzzleText) {
      this.clickPuzzleText = () => of('Click on the piece to place it on the puzzle');
    }
  }

  public nextStampClicked(): void {

    if (this.isAllPuzzleCompleted()) {
      this.completed.emit();
    } else if ((this.remainingPuzzleTiles.length) > 0) {
      const puzzleLocation = this.remainingPuzzleTiles[0].puzzleLocation;
      this.moved.emit();
      this.boardPuzzleTiles[puzzleLocation].isSelected = true;
      this.remainingPuzzleTiles = this.remainingPuzzleTiles
        .filter((currentValue: DrawTile) => currentValue.puzzleLocation !== puzzleLocation);
    }
  }

  public getPuzzleTileStyle(tile: DrawTile): any {
    const leftPosition = (tile.puzzleLocation % this.cols) * this.tileWidth;
    const topPosition = Math.floor((tile.puzzleLocation / this.cols)) * this.tileHeight;
    if (tile.isSelected) {
      return {
        // tslint:disable: object-literal-key-quotes
        width: `${this.tileWidth}px`,
        height: `${this.tileHeight}px`,
        'background-position': `${-leftPosition}px ${-topPosition}px`,
        'background-image': `url(${this.img})`,
        'background-size': `${this.imageWidth}px ${this.imageHeight}px`,
        'background-repeat': 'no-repeat',
        '-webkit-filter': 'none',
        filter: 'none',
        '-webkit-transform': 'translateZ(0)'
      };
    }
    return {
      width: `${this.tileWidth}px`,
      height: `${this.tileHeight}px`,
      'background-position': `${-leftPosition}px ${-topPosition}px`,
      'background-image': `url(${this.img})`,
      'background-size': `${this.imageWidth}px ${this.imageHeight}px`,
      'background-repeat': 'no-repeat',
      '-webkit-filter': 'grayscale(100%)',
      filter: 'grayscale(100%)',
      '-webkit-transform': 'translateZ(0)'  // Hacky way to make filter work on iOS
    };
  }

  public getBottomTilesStyle(index: number): any {

    if ((this.remainingPuzzleTiles.length) > index) {

      const puzzlePosition = this.remainingPuzzleTiles[index].puzzleLocation;
      const leftPosition = (puzzlePosition % this.cols) * this.tileWidth;
      const topPositionIndex = Math.floor((puzzlePosition / this.cols));
      const topPosition = topPositionIndex * this.tileHeight;

      return {
        width: `${this.tileWidth}px`,
        height: `${this.tileHeight}px`,
        'background-position': `${-leftPosition}px ${-topPosition}px`,
        'background-image': `url(${this.img})`,
        'background-size': `${this.imageWidth}px ${this.imageHeight}px`,
        'background-repeat': 'no-repeat'
      };
    }
    return {
      background: '#ebebeb'
    };
  }

  public getImageSize(): any {
    return {
      width: `${this.imageWidth}px`,
      height: `${this.imageHeight}px`
    };
  }

  public getTileSize(): any {
    return {
      width: `${this.tileWidth}px`,
      height: `${this.tileHeight}px`
    };
  }

  public getWidthHeightRatio(): string {
    const ratioValue = (this.tileWidth / this.tileHeight);
    return `${ratioValue.toString()}:1`;
  }

  public isAllPuzzleCompleted(): boolean {

    for (let i = 0; i < this.totalPieces; i++) {
      if (!this.boardPuzzleTiles[i].isSelected) {
        return false;
      }
    }
    return true;
  }

  public dismissOverlayHint(): void {
    this.showHint = false;
  }

  public onImageLoad(): void {

    this.imageReady = true;

    this.imageWidth = this.puzzleView.nativeElement.width;
    if (this.puzzleView.nativeElement.naturalHeight > this.puzzleView.nativeElement.clientHeight) {
      // console.log(`Height: ${this.puzzleView.nativeElement.height}`);
      this.imageHeight = this.puzzleView.nativeElement.height;
    } else {
      // console.log(`Height: ${this.puzzleView.nativeElement.naturalHeight}`);
      this.imageHeight = this.puzzleView.nativeElement.naturalHeight;
    }

    this.tileWidth = this.imageWidth / this.cols;
    this.tileHeight = this.imageHeight / this.rows;
    this.totalPieces = this.rows * this.cols;

    for (let x = 0; x < this.totalPieces; x++) {
      this.boardPuzzleTiles[x] = { puzzleLocation: x, isSelected: (x < this.nbPlayedPieces) };
    }
    for (let i = 0; i < this.nbAvailablePieces; i++) {
      const location = this.nbPlayedPieces + i;
      this.remainingPuzzleTiles[i] = { puzzleLocation: location, isSelected: false };
    }
    for (let i = 0; i < this.totalPieces; i++) {
      this.staticPuzzleDummyTiles[i] = [i];
    }
  }
}
