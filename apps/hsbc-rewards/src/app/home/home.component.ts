import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IReward, RewardsService, LoyaltyService, ProfileService } from '@perx/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rewards: Observable<IReward[]>;
  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private profile: ProfileService
  ) { 
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
