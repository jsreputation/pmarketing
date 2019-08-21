import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { IReward, RewardsService, LoyaltyService } from '@perx/core';
import { LoyaltySummaryComponent, ITabConfig } from '@perx/core';
import { switchMap } from 'rxjs/operators';

const mockTags: ITabConfig[] = [
  {
    filterKey: null,
    filterValue: null,
    tabName: 'All Rewards',
    rewardsList: null
  }, {
    filterKey: 'Lifestyle',
    filterValue: null,
    tabName: 'Lifestyle',
    rewardsList: null
  }, {
    filterKey: null,
    tabName: 'Travel',
    filterValue: '',
    rewardsList: null
  }, {
    filterKey: 'Shopping',
    tabName: 'Shopping',
    filterValue: '',
    rewardsList: null
  }

];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public tabs: Subject<ITabConfig[]> = new Subject<ITabConfig[]>();
  public staticTab: ITabConfig[];
  public rewardsCollection: Observable<IReward[]>;

  @ViewChild('loyaltySummary', { static: false }) public loyaltySummary: LoyaltySummaryComponent;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.getRewardsCollection();
    this.getRewards();
  }

  public ngAfterViewInit(): void {
    // @ts-ignore to be verified
    this.loyaltySummary.loyalty$ = new BehaviorSubject({
      pointsBalance: '100,000',
      expiringPoints: [{ expireDate: new Date('Jul 17 2017') }],
      points: 1000,
      expireDate: new Date('Jul 17 2017')
    });
    this.cd.detectChanges();
  }

  public getRewardsCollection(): void {
    this.rewardsCollection = this.rewardsService.getAllRewards();
  }

  public getRewards(): void {
    this.getTags().pipe(switchMap((tags: ITabConfig[]) => {
      return forkJoin(tags.map((tab) => {
        return this.rewardsService.getAllRewards(null, tab.filterKey ? [tab.filterKey] : null);
      }));
    })).subscribe((result) => {
      result.forEach((rewards: IReward[], index) => {
        this.staticTab[index].rewardsList = of(rewards);
        this.tabs.next(this.staticTab);
      });
    });
  }

  public getTags(): Observable<ITabConfig[]> {
    this.rewardsService.getTags();
    this.staticTab = mockTags;
    return of(mockTags);
  }

  public openRewardDetails(tab: IReward): void {
    this.router.navigate([`detail/element/${tab.id}`]);
  }

}
