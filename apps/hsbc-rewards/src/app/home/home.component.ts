import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {IReward, RewardsService, LoyaltyService, ProfileService, ILoyalty} from '@perx/core';
import {LoyaltySummaryComponent, ITabConfig} from '@perx/core';

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
  public loyaltyId: number;
  public loyalty$: Observable<ILoyalty>;
  @ViewChild('loyaltySummary', {static: false}) public loyaltySummary: LoyaltySummaryComponent;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.getRewards();
    this.getTags();
    this.loyalty$ = this.loyaltyService.getLoyalty(100);
    this.loyaltyId=100
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
