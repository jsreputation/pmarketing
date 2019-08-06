import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';
import { mock } from '../reward-mock';

@Component({
  selector: 'app-rewards-list-tabbed',
  templateUrl: './rewards-list-tabbed.component.html',
  styleUrls: ['./rewards-list-tabbed.component.scss']
})
export class RewardsListTabbedComponent implements OnInit {
  // public navLinks = [
  //   { path: 'hsbc', label: 'HSBC' },
  //   { path: 'others', label: 'others' },
  // ];
  public rewards: Observable<IReward[]>;

  constructor(private rewardsService: RewardsService) {
  }

  public ngOnInit(): void {
    this.getRewards();
  }

  public getRewards(): void {
    this.rewardsService.getAllRewards()
      .subscribe(
        (rewards: IReward[]) => {

          this.rewards = of(rewards);
        },
        () => this.rewards = of(mock)
      );
  }
}
