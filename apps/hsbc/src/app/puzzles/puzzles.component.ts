import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IStampCard } from '@perx/core/dist/perx-core';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss']
})
export class PuzzlesComponent implements OnInit {
  campaignId: number = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.campaignId = Number.parseInt(params.get('campaignId'), 10);
    });
  }

  selected(puzzle: IStampCard) {
    this.router.navigate([`/puzzle/${this.campaignId}/${puzzle.id}`]);
  }
}
