import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IStamp } from '../../stamp/models/stamp.model';

export interface IStyleObject {
  [key: string]: string;
}

export interface IMove {
  nbPlayedPieces: number;
  nbAvailablePieces: number;
}

@Component({
  selector: 'perx-core-puzzle-stamp',
  templateUrl: './puzzle-stamp.component.html',
  styleUrls: ['./puzzle-stamp.component.scss']
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
  @Input() public bgImage: string;
  @Input() public isCompleted: boolean;
  @Input() public isCurrent: boolean;
  @Input() public stamps: IStamp[];

  @Output() public moved: EventEmitter<IMove> = new EventEmitter();
  @Output() public completed: EventEmitter<void> = new EventEmitter();
  @Output() public stampAll: EventEmitter<void> = new EventEmitter();

  public isUnlockedAll: boolean = false;
  protected count: number = 0;
  public buttonText: string = 'Tap here to use all earned keys';

  public movedItems: number[] = [];
  public currentClick: number;

  public ngOnInit(): void {
    if (this.nbPlayedPieces > 0) {
      this.movedItems = Array.from(Array(this.nbPlayedPieces).keys());
    }
    this.currentClick = this.nbPlayedPieces;
  }

  public isStampAvailable(r: number, c: number): boolean {
    return (
      this.getCurrentColumn(r, c) < this.nbAvailablePieces + this.nbPlayedPieces
    );
  }

  public styleObject(r: number, c: number): IStyleObject {
    const style = { 'border-color': this.borderColor };
    if (this.isStampAvailable(r, c)) {
      style['background-color'] = this.highlightColor;
    }
    return style;
  }

  public getCurrentColumn(r: number, c: number): number {
    return (r + 1 - 1) * this.cols + c + 1 - 1;
  }

  public isStampClicked(r: number, c: number): boolean {
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

  public unlockAllAvailable(): void {
    this.isUnlockedAll = true;
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
    this.stampAll.emit();
  }

  public stampStyle(): IStyleObject {
    return this.bgImage && !this.isCompleted ?
      {'background-image': 'url(' + this.bgImage + ')', 'background-color': '#000'} :
      {'background-image': 'none', 'background-color': 'transparent'};
  }

  public availablePieces(): string {
    const redeemdStamp = this.stamps.filter(stamp => stamp.state === 'redeemed');
    this.buttonText = redeemdStamp.length >= this.cols ? 'Netflix rebate earned' : this.buttonText;

    if (redeemdStamp.length >= this.cols) {
      return 'btn-redeemed';
    }
    if (!this.isCurrent) {
      return 'btn-unavailable';
    }
  }

  public isDisabled(): boolean {
    const issuedStamp = this.stamps.filter(stamp => stamp.state === 'issued');
    return this.isCurrent && issuedStamp.length > 0;
  }
}
