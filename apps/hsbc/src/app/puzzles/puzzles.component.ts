import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPuzzle } from '@perx/core/dist/perx-core/lib/puzzles/puzzle.model';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss']
})
export class PuzzlesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selected(puzzle: IPuzzle) {
    this.router.navigate(['/puzzle']);
  }
}
