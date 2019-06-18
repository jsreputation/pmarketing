import { Component, OnInit } from '@angular/core';
import { IPuzzle } from '../puzzle.model';

@Component({
  selector: 'perx-core-puzzle-play',
  templateUrl: './puzzle-play.component.html',
  styleUrls: ['./puzzle-play.component.css']
})
export class PuzzlePlayComponent implements OnInit {
  puzzle: IPuzzle;

  constructor() { }

  ngOnInit() {
  }
}
