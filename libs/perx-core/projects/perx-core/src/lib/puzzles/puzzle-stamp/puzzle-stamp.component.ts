import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface IStyleObject {
  [key: string]: string;
}
@Component({
  selector: 'perx-core-puzzle-stamp',
  templateUrl: './puzzle-stamp.component.html',
  styleUrls: ['./puzzle-stamp.component.css']
})
export class PuzzleStampComponent implements OnInit {
  @Input() public img: string;
  @Input() public lockImg: string;
  @Input() public unlockImg: string;
  @Input() public highlightColor: string;
  @Input() public borderColor: string;
  @Input() public rows: number;
  @Input() public cols: number;
  @Input() public nbPlayedPieces: number;
  @Input() public nbAvailablePieces: number;

  @Output() public moved = new EventEmitter();
  @Output() public completed = new EventEmitter();

  public movedItems = [];
  public currentClick;

  constructor() {}

  public ngOnInit(): void {
    if (this.nbPlayedPieces > 0) {
      this.movedItems = Array.from(Array(this.nbPlayedPieces).keys());
    }
    this.currentClick = this.nbPlayedPieces;
  }

  public isLessThanAvailblePieces(r, c): boolean {
    return (
      this.getCurrentColumn(r, c) < this.nbAvailablePieces + this.nbPlayedPieces
    );
  }

  public styleObject(r, c): IStyleObject {
    const style = { 'border-color': this.borderColor };
    if (this.isLessThanAvailblePieces(r, c)) {
      style['background-color'] = this.highlightColor;
    }
    return style;
  }

  public getCurrentColumn(r, c): number {
    return (r + 1 - 1) * this.cols + c + 1 - 1;
  }

  public isMoved(r, c): boolean {
    return this.movedItems.includes(this.getCurrentColumn(r, c));
  }

  public isWon(): void {
    this.moved.emit({
      nbPlayedPieces: this.nbPlayedPieces,
      nbAvailablePieces: this.nbAvailablePieces
    });
    if (this.nbPlayedPieces >= this.rows * this.cols) {
      this.completed.emit();
    }
  }

  public cardClick(): void {
    if (this.currentClick < this.nbAvailablePieces + this.nbPlayedPieces) {
      this.movedItems.push(this.currentClick++);
      this.nbPlayedPieces++;
      this.nbAvailablePieces--;
      this.isWon();
    }
  }

  public unlockAvailable(): void {
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
