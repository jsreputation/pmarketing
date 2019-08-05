import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';
import { mock } from '../reward-mock';

@Component({
  selector: 'app-rewards-collection',
  templateUrl: './rewards-collection.component.html',
  styleUrls: ['./rewards-collection.component.scss']
})
export class RewardsCollectionComponent implements OnInit {

  rewards: Observable<IReward[]>;

  constructor(private rewardsService: RewardsService) {
  }

  ngOnInit() {
    this.getRewards();
  }

  getRewards() {
    this.rewardsService.getAllRewards()
      .subscribe(
        (rewards) => this.rewards = of(rewards),
        () => this.rewards = of(mock)
      );
  }
}
