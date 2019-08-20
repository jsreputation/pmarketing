import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {IReward, RewardsService, LoyaltyService} from '@perx/core';
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
export class HomeComponent implements OnInit, AfterViewInit {
  public tags: ITabConfig[];
  public rewards: Observable<IReward[]>;

  @ViewChild('loyaltySummary', {static: false}) public loyaltySummary: LoyaltySummaryComponent;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.getRewards();
    this.getTags();
  }

  public ngAfterViewInit(): void {
    // @ts-ignore to be verified
    this.loyaltySummary.loyalty$ = new BehaviorSubject({
      pointsBalance: '100,000',
      expiringPoints: [{expireDate: new Date('Jul 17 2017')}],
      points: 1000,
      expireDate: new Date('Jul 17 2017')
    });
    this.cd.detectChanges();
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
    this.tags = mockTags;
  }

  public openRewardDetails(tab: IReward): void {
    this.router.navigate([`detail/element/${tab.id}`]);
  }
}
