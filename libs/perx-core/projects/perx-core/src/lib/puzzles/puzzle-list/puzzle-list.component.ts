import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IPuzzle } from '../puzzle.model';

@Component({
  selector: 'perx-core-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.css']
})
export class PuzzleListComponent implements OnInit {
  puzzles: IPuzzle[];

  @Output()
  selected: EventEmitter<IPuzzle> = new EventEmitter<IPuzzle>();

  constructor() { }

  ngOnInit() {
    this.puzzles = [
      { name: 'Puzzle A', draws: [{}, {}] },
      { name: 'Puzzle B' },
      { name: 'Puzzle C' },
      { name: 'Puzzle D' }
    ];
  }

  puzzleSelected(index: number) {
    this.selected.emit(this.puzzles[index]);
  }
}
