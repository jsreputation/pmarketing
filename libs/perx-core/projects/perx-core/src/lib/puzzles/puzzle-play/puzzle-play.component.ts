import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface DrawTile {
  puzzleLocation: number;
  isSelected: boolean;
}

@Component({
  selector: 'perx-core-puzzle-play',
  templateUrl: './puzzle-play.component.html',
  styleUrls: ['./puzzle-play.component.css']
})
export class PuzzlePlayComponent implements OnInit {
  @Input()
  img: string;

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

  totalPieces;

  imageWidth = 300;
  imageHeight = 200;

  staticPizzleDummyTiles = [];

  ngOnInit() {

    this.tileWidth = this.imageWidth / this.cols;
    this.tileHeight = this.imageHeight / this.rows;
    this.totalPieces = this.rows * this.cols;

    for (let x = 0; x < this.totalPieces; x++)  {
        const puzzleTile = { puzzleLocation: x, isSelected: (x < this.nbPlayedPieces) };
        this.boardPuzzleTiles[x] = puzzleTile;
    }

    for (let i = 0; i < this.nbAvailablePieces; i++) {

      const location = this.nbPlayedPieces + i;
      const puzzleTile = { puzzleLocation: location, isSelected: false };
      this.remainingPuzzleTiles[i] = puzzleTile;
    }

    for (let i = 0; i < this.totalPieces; i++) {
      this.staticPizzleDummyTiles[i] = [i];
    }

  }

  tileClicked(index) {

    if (this.isAllPuzzleCompleted()) {
      this.completed.emit();
  } else {

      if ((this.remainingPuzzleTiles.length) > index) {
        const puzzleLocation = this.remainingPuzzleTiles[index].puzzleLocation;
        this.moved.emit();
        this.boardPuzzleTiles[puzzleLocation].isSelected = true;
        this.remainingPuzzleTiles = this.remainingPuzzleTiles.filter((currentValue) => {
            return currentValue.puzzleLocation !== puzzleLocation;
        });
      }
    }
  }

  getPuzzleTileStyle(tile: DrawTile) {

    const leftPosition = (tile.puzzleLocation % this.cols) *  this.tileWidth;
    const topPositionIndex = Math.floor((tile.puzzleLocation  / this.cols ));
    const topPosition = topPositionIndex *  this.tileHeight;
    const imagePathFinal = tile.isSelected ? this.img : '';

    if (tile.isSelected) {
      return {
        backgroundPosition: (-leftPosition) + 'px ' + (-topPosition) + 'px',
        backgroundImage: 'url(' + imagePathFinal + ')',
        backgroundSize: this.imageWidth + 'px ' + this.imageHeight + 'px',
      };
    } else {
      return {
        background: 'white',
      };
    }
  }

  getBottomTilesStyle(index) {

     if ((this.remainingPuzzleTiles.length) > index) {

       const puzzlePosition = this.remainingPuzzleTiles[index].puzzleLocation;
       const leftPosition = (puzzlePosition % this.cols) *  this.tileWidth;
       const topPositionIndex = Math.floor((puzzlePosition  / this.cols ));
       const topPosition = topPositionIndex *  this.tileHeight;

       return {
          backgroundPosition: (-leftPosition) + 'px ' + (-topPosition) + 'px',
          backgroundImage: 'url(' + this.img + ')',
          backgroundSize: this.imageWidth + 'px ' + this.imageHeight + 'px',
        };
     }
     return {
        background: '#ebebeb'
      };
  }

  getImageSize() {

    return {
      width: (this.imageWidth) + 'px',
      height: (this.imageHeight) + 'px'
    };
  }

  getTileSize() {

    return {
      width: (this.tileWidth) + 'px',
      height: (this.tileHeight) + 'px'
    };
  }

  getWidthHeightRatio() {

    const ratioValue = (this.tileWidth / this.tileHeight);
    const ratio = ratioValue.toString() + ':1';
    return ratio;
  }

  isAllPuzzleCompleted() {

    for (let i = 0; i < this.totalPieces; i++) {
        if (!this.boardPuzzleTiles[i].isSelected) {
          return false;
        }
    }
    return true;
  }
}
