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

  @Output() moved = new EventEmitter();
  @Output() completed = new EventEmitter();

  movedItems = [];
  currentClick;

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
    this.moved.emit({
      nbPlayedPieces: this.nbPlayedPieces,
      nbAvailablePieces: this.nbAvailablePieces
    });
    if (this.nbPlayedPieces >= this.rows * this.cols) {
      this.completed.emit();
    }
  }

  cardClick() {
    if (this.currentClick < this.nbAvailablePieces + this.nbPlayedPieces) {
      this.movedItems.push(this.currentClick++);
      this.nbPlayedPieces++;
      this.nbAvailablePieces--;
      this.isWon();
    }
  }

  unlockAvailable() {
    let i = 0;
    while (i < this.nbAvailablePieces) {
      if (i === this.cols * this.rows - this.nbPlayedPieces) {
        break;
      }
      this.movedItems.push(this.currentClick++);
      i++;
    }
    this.nbPlayedPieces = this.nbPlayedPieces + i;
    this.nbAvailablePieces = this.nbAvailablePieces - i;
    this.isWon();
  }
}
