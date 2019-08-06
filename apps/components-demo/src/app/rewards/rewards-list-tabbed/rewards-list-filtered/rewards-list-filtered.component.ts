import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mock } from '../../reward-mock';

@Component({
  selector: 'app-rewards-list-filtered',
  templateUrl: './rewards-list-filtered.component.html',
  styleUrls: ['./rewards-list-filtered.component.scss']
})
export class RewardsListFilteredComponent implements OnInit {

  public rewards: Observable<IReward[]>;
  public activeLink: string;

  ngOnInit() {
    const url = this.activatedRoute.snapshot.url;
    this.activeLink = url[url.length - 1].path;
    this.getRewards();
  }
  constructor(private rewardsService: RewardsService,
              private activatedRoute: ActivatedRoute) {
  }

  getRewards() {
    this.rewardsService.getAllRewards()
      .subscribe(
        (rewards: IReward[]) => {

          this.rewards = of(this.filterRewardsByMerchantName(rewards, this.activeLink));
        },
        () => this.rewards = of(mock)
      );
  }

  reloadRewards(link: string) {
    this.activeLink = link;
    this.getRewards();
  }

  // can't use variable based keys because we're on ES5
  filterRewardsByMerchantName(rewards: IReward[], value: string): IReward[] {
    if (value === 'others') {
      return rewards;
    }
    const filteredRewards = rewards.filter((reward: IReward) => {
        return reward.merchantName &&
          reward.merchantName.toLowerCase() === value.toLowerCase();
      }
    );
    return filteredRewards;
  }
}
