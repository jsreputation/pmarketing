import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'perx-core-puzzle-stamp',
  templateUrl: './puzzle-stamp.component.html',
  styleUrls: ['./puzzle-stamp.component.css']
})
export class PuzzleStampComponent implements OnInit {
  @Input() img: string;
  @Input() lockImg: string;
  @Input() unlockImg: string;
  @Input() highlightColor: string;
  @Input() borderColor: string;
  @Input() rows: number;
  @Input() cols: number;
  @Input() nbPlayedPieces: number;
  @Input() nbAvailablePieces: number;
  @Input() bgImage: string;
  @Input() isCompleted: boolean;

  @Output() moved = new EventEmitter();
  @Output() completed = new EventEmitter();

  movedItems = [];
  currentClick;
  isUnlockedAll = false;
  count = 0;
  btnTxt = 'Tap here to use all earned keys';

  constructor() {}

  ngOnInit() {
    if (this.nbPlayedPieces > 0) {
      this.movedItems = Array.from(Array(this.nbPlayedPieces).keys());
    }
    this.currentClick = this.nbPlayedPieces;
  }

  isLessThanAvailblePieces(r, c) {
    return (
      this.getCurrentColumn(r, c) < this.nbAvailablePieces + this.nbPlayedPieces
    );
  }

  styleObject(r, c) {
    const style = { 'border-color': this.borderColor };
    if (this.isLessThanAvailblePieces(r, c)) {
      style['background-color'] = this.highlightColor;
    }
    return style;
  }

  getCurrentColumn(r, c) {
    return (r + 1 - 1) * this.cols + c + 1 - 1;
  }

  isMoved(r, c) {
    return this.movedItems.includes(this.getCurrentColumn(r, c));
  }

  isWon() {
    console.log('lib moved');
    this.moved.emit({
      nbPlayedPieces: this.nbPlayedPieces,
      nbAvailablePieces: this.nbAvailablePieces
    });
    if (this.nbPlayedPieces >= this.rows * this.cols) {
      this.completed.emit();
    }
  }

  cardClick() {
    setTimeout( () => {
      if (this.currentClick < this.nbAvailablePieces + this.nbPlayedPieces) {
        this.movedItems.push(this.currentClick++);
        this.nbPlayedPieces++;
        this.nbAvailablePieces--;
        this.isWon();
      }
    }, 1000 );
  }

  unlockAvailable() {
    let i = 0;
    this.isUnlockedAll = true;
    setTimeout( () => {
      while (i < this.nbAvailablePieces) {
        if (i === this.cols * this.rows - this.nbPlayedPieces) {
          console.log('should break');
          break;
        }
        this.movedItems.push(this.currentClick++);
        i++;
      }
      this.nbPlayedPieces = this.nbPlayedPieces + i;
      this.nbAvailablePieces = this.nbAvailablePieces - i;
      this.isWon();
    }, 1000);
  }

  stampStyle() {
    return this.bgImage && !this.isCompleted ? 
    {'background-image': 'url(' + this.bgImage + ')', 'background-color': '#000'} : {'background-image': 'none', 'background-color': 'transparent'};
  }

  availablePieces() {
    this.btnTxt = this.nbAvailablePieces <= 0 ? 'Redeemed' : this.btnTxt;
    return this.nbAvailablePieces > 0;
  }
}
