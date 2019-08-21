import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { IReward, RewardsService, LoyaltyService, ILoyalty } from '@perx/core';
import { ITabConfig } from '@perx/core';
import { map } from 'rxjs/operators';

const mockTags: ITabConfig[] = [
  {
    filterKey: null,
    tabName: 'All Rewards',
    filterValue: null,
    rewardsList: null
  }, {
    filterKey: null,
    tabName: 'Lifestyle',
    filterValue: '',
    rewardsList: null
  }, {
    filterKey: null,
    tabName: 'Travel',
    filterValue: '',
    rewardsList: null
  }, {
    filterKey: null,
    tabName: 'Shopping',
    filterValue: '',
    rewardsList: null
  }];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tabs: Observable<ITabConfig[]>;
  public rewards: Observable<IReward[]>;
  public loyalty$: Observable<ILoyalty>;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.getRewards();
    this.getTags();
    this.loyalty$ = this.loyaltyService.getLoyalty(100)
      .pipe(map((loyalty: ILoyalty) => {
        loyalty.pointsBalance = 10000;
        if (loyalty.expiringPoints[0] && (!loyalty.expiringPoints[0].expireDate || loyalty.expiringPoints[0].points)) {
          loyalty.expiringPoints[0].expireDate = new Date().toString();
          loyalty.expiringPoints[0].points = 100;
        }
        return loyalty;
      }));
  }

  public getRewards(): void {
    this.rewardsService.getAllRewards().subscribe(
      (rewards: IReward[]) => {
        if (rewards && rewards.length > 0) {
          this.rewards = of(rewards);
        }
      }
    );
  }

  public getTags(): void {
    this.rewardsService.getTags();
    this.tabs = of(mockTags);
  }

  public openRewardDetails(tab: IReward): void {
    this.router.navigate([`detail/element/${tab.id}`]);
  }
}
