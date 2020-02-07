import {Component, Input, OnInit} from '@angular/core';
import {IReward} from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-category-reward-card',
  templateUrl: './category-reward-card.component.html',
  styleUrls: ['./category-reward-card.component.scss']
})
export class CategoryRewardCardComponent implements OnInit {
  @Input() reward: IReward;

  constructor() { }

  ngOnInit() {
  }

}
