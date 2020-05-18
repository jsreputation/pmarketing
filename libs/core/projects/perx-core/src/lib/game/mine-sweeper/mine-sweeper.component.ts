import {Component, Input} from '@angular/core';
import { Board } from './board';
import { Cell } from './cell';

@Component({
  selector: 'perx-core-mine-sweeper',
  templateUrl: './mine-sweeper.component.html',
  styleUrls: ['./mine-sweeper.component.scss']
})
export class MineSweeperComponent {
  public title: 'minesweeper' = 'minesweeper';
  public board: Board;

  // inputs will be validated against on set up page
  @Input()
  public size: number = 5; // must be at least 5

  @Input()
  public numOfMines: number = Math.floor(this.size / 2);

  constructor() {
    this.reset();
  }

  public checkCell(cell: Cell): void {
    const result = this.board.checkCell(cell);
    if (result === 'gameover') {
      alert('You lose');
    } else if (result === 'win') {
      alert('you win');
    }
  }

  public flag(cell: Cell): void {
    if (cell.status === 'flag') {
      cell.status = 'open';
    } else {
      cell.status = 'flag';
    }
  }

  public colorCell(numProx: number): string {
    console.log(numProx, 'num prox');
    switch (numProx) {
      case 1:
        return 'yellow';
      case 2:
        return 'khaki';
      case 3:
        return 'darkgreen';
      case 4:
      case 5:
      case 6:
        return 'orange';
      case 7:
      case 8:
        return 'red';
      default:
        return 'black';
    }
  }

  public reset(): void {
    this.board = new Board(this.size, this.numOfMines);
  }
}
