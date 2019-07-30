import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-rewards-carousel',
  templateUrl: './rewards-carousel.component.html',
  styleUrls: ['./rewards-carousel.component.scss']
})
export class RewardsCarouselComponent implements OnInit {

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
