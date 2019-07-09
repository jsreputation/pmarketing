import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-dashboard-game-card',
  templateUrl: './dashboard-game-card.component.html',
  styleUrls: ['./dashboard-game-card.component.scss']
})
export class DashboardGameCardComponent implements OnInit {
  @Input() gameCard: DashboardGameCard;
  constructor() { }

  ngOnInit() {
  }

}
