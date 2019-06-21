import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'perx-core-puzzle-play',
  templateUrl: './puzzle-play.component.html',
  styleUrls: ['./puzzle-play.component.css']
})
export class PuzzlePlayComponent implements OnInit {
  @Input()
  img: string;

  @Input()
  rows = 2;

  @Input()
  cols = 3;

  @Input()
  nbPlayedPieces = 0;

  @Input()
  nbAvailablePieces = 0;

  @Output()
  moved = new EventEmitter<void>();

  @Output()
  completed = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
}
