import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IPuzzle } from '../puzzle.model';

@Component({
  selector: 'perx-core-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.css']
})
export class PuzzleListComponent implements OnInit {
  puzzles: IPuzzle[];
  @Input() iconDisplay = 'arrow_forward_ios';
  @Input() total = 6;

  @Output()
  selected: EventEmitter<IPuzzle> = new EventEmitter<IPuzzle>();

  constructor() { }

  ngOnInit() {
    this.puzzles = [
      { name: 'Puzzle A', draws: [{}, {}], image: 'https://picsum.photos/200' },
      { name: 'Puzzle B', image: 'https://picsum.photos/200' },
      { name: 'Puzzle C', image: 'https://picsum.photos/200' },
      { name: 'Puzzle D', image: 'https://picsum.photos/200' }
    ];
  }

  puzzleSelected(index: number) {
    this.selected.emit(this.puzzles[index]);
  }
}
