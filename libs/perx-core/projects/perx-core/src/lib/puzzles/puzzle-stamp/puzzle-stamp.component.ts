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

  constructor() {}

  ngOnInit() {
    if (this.nbPlayedPieces > 0) {
      this.movedItems = Array.from(Array(this.nbPlayedPieces).keys());
    }
  }

  getCurrentColumn(r, c) {
    return (r + 1 - 1) * this.cols + c + 1 - 1;
  }

  isLessThanAvailblePieces(r, c) {
    return this.getCurrentColumn(r, c) < this.nbAvailablePieces;
  }

  styleObject(r, c) {
    const style = { 'border-color': this.borderColor };
    if (this.isLessThanAvailblePieces(r, c)) {
      style['background-color'] = this.highlightColor;
    }
    return style;
  }

  toMove() {
    this.moved.emit({ nbPlayedPieces: this.nbPlayedPieces });
    if (this.nbPlayedPieces >= this.rows * this.cols) {
      this.completed.emit();
    }
  }

  onMoved($event, r, c) {
    if ($event.target.classList.contains('available')) {
      this.movedItems.push(this.getCurrentColumn(r, c));
      this.nbPlayedPieces++;
      this.toMove();
    }
  }

  isUnlockable() {
    return this.nbAvailablePieces >= this.rows * this.cols;
  }

  isMoved(r, c) {
    return this.movedItems.includes(this.getCurrentColumn(r, c));
  }

  unlockAll() {
    let num = 0;
    this.nbPlayedPieces = this.rows * this.cols;
    while (num < this.nbAvailablePieces) {
      this.movedItems.push(num);
      num++;
      if (num >= this.nbAvailablePieces) {
        this.toMove();
      }
    }
  }
}
