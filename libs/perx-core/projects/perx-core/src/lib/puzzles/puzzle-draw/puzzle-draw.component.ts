import { Component, OnInit } from '@angular/core';
import { IPuzzle } from '../puzzle.model';

@Component({
  selector: 'perx-core-puzzle-draw',
  templateUrl: './puzzle-draw.component.html',
  styleUrls: ['./puzzle-draw.component.css']
})
export class PuzzleDrawComponent implements OnInit {
  puzzle: IPuzzle;
  constructor() { }

  ngOnInit() {
  }

}
