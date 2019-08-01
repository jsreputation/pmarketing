import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss']
})
export class RewardsListComponent implements OnInit {

  rewards: Observable<IReward[]>;

  constructor(private rewardsService: RewardsService) {
  }

  ngOnInit() {
    this.getRewards();
  }

  getRewards() {
    this.rewardsService.getAllRewards().subscribe(
      (rewards: IReward[]) => {
        if (rewards && rewards.length > 0) {
          this.rewards = of(rewards);
        }
      }
    );
  }
}
