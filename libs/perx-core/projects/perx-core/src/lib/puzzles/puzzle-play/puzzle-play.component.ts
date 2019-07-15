import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
  ViewChild,
  // SimpleChanges
} from '@angular/core';
//  import { Observable, Observer } from 'rxjs';

interface DrawTile {
  puzzleLocation: number;
  isSelected: boolean;
}

@Component({
  selector: 'perx-core-puzzle-play',
  templateUrl: './puzzle-play.component.html',
  styleUrls: ['./puzzle-play.component.scss']
})
export class PuzzlePlayComponent implements OnChanges {
  @Input()
  img: string;

  @Input()
  showHint = false;

  @Input()
  rows = 2;

  @Input()
  cols = 3;

  @Input()
  nbPlayedPieces = 0;

  @Input()
  nbAvailablePieces = 0;

  @Output()
  moved = new EventEmitter<void>();

  @Output()
  completed = new EventEmitter<void>();

  tileWidth = 0;
  tileHeight = 0;

  boardPuzzleTiles: DrawTile[] = [];
  remainingPuzzleTiles: DrawTile[] = [];

  totalPieces: number;

  imageWidth = 300;
  imageHeight = 200;
  imageReady = false;

  staticPuzzleDummyTiles = [];

  @ViewChild('puzzleBoard', { static: false }) puzzleView: ElementRef;

  ngOnChanges(
    // changes: SimpleChanges
  ) {
    if (this.img) {

      if (this.nbAvailablePieces !== 0 && this.showHint) {
        // this.imageReady = true;
      }
      // this.getImageSizeRatioFromURL(this.img).subscribe(ratio => {
      //     this.imageHeight = this.imageWidth * ratio;
/*
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
      }*/

      // },
      // err => console.error('Observer got an error: ' + err));
    }
  }

  nextStampClicked(): void {

    if (this.isAllPuzzleCompleted()) {
      this.completed.emit();
    } else {

      if ((this.remainingPuzzleTiles.length) > 0) {
        const puzzleLocation = this.remainingPuzzleTiles[0].puzzleLocation;
        this.moved.emit();
        this.boardPuzzleTiles[puzzleLocation].isSelected = true;
        this.remainingPuzzleTiles = this.remainingPuzzleTiles.filter((currentValue) => {
          return currentValue.puzzleLocation !== puzzleLocation;
        });
      }
    }
  }

  getPuzzleTileStyle(tile: DrawTile): any {

    const leftPosition = (tile.puzzleLocation % this.cols) * this.tileWidth;
    const topPosition = Math.floor((tile.puzzleLocation / this.cols)) * this.tileHeight;
    if (tile.isSelected) {
      return {
        width: this.tileWidth + 'px',
        height: this.tileHeight + 'px',
        'background-position': (-leftPosition) + 'px ' + (-topPosition) + 'px',
        'background-image': 'url(' + this.img + ')',
        'background-size': this.imageWidth + 'px ' + this.imageHeight + 'px',
        'background-repeat': 'no-repeat',
        '-webkit-filter': 'none',
        filter: 'none'
      };

    } else {
      return {
        width: this.tileWidth + 'px',
        height: this.tileHeight + 'px',
        'background-position': (-leftPosition) + 'px ' + (-topPosition) + 'px',
        'background-image': 'url(' + this.img + ')',
        'background-size': this.imageWidth + 'px ' + this.imageHeight + 'px',
        'background-repeat': 'no-repeat',
        '-webkit-filter': 'grayscale(100%)',
        filter: 'grayscale(100%)'
      };
    }
  }

  getBottomTilesStyle(index: number): any {

    if ((this.remainingPuzzleTiles.length) > index) {

      const puzzlePosition = this.remainingPuzzleTiles[index].puzzleLocation;
      const leftPosition = (puzzlePosition % this.cols) * this.tileWidth;
      const topPositionIndex = Math.floor((puzzlePosition / this.cols));
      const topPosition = topPositionIndex * this.tileHeight;

      return {
        width: this.tileWidth + 'px',
        height: this.tileHeight + 'px',
        'background-position': (-leftPosition) + 'px ' + (-topPosition) + 'px',
        'background-image': 'url(' + this.img + ')',
        'background-size': this.imageWidth + 'px ' + this.imageHeight + 'px',
        'background-repeat': 'no-repeat'
      };
    }
    return {
      background: '#ebebeb'
    };
  }

  getImageSize(): any {
    return {
      width: (this.imageWidth) + 'px',
      height: (this.imageHeight) + 'px'
    };
  }

  getTileSize(): any {
    return {
      width: (this.tileWidth) + 'px',
      height: (this.tileHeight) + 'px'
    };
  }

  getWidthHeightRatio(): string {
    const ratioValue = (this.tileWidth / this.tileHeight);
    return ratioValue.toString() + ':1';
  }

  isAllPuzzleCompleted(): boolean {

    for (let i = 0; i < this.totalPieces; i++) {
      if (!this.boardPuzzleTiles[i].isSelected) {
        return false;
      }
    }
    return true;
  }

  dismissOverlayHint() {
    this.showHint = false;
  }

  onImageLoad() {

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
