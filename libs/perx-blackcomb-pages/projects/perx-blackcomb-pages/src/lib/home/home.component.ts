import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICampaignService, ICampaign, RewardsService, IReward, ITabConfigExtended } from '@perx/core';
import { Observable, BehaviorSubject, forkJoin, of, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

const stubTabs: ITabConfigExtended[] = [
  {
    filterKey: null,
    filterValue: null,
    tabName: 'ALL',
    rewardsList: null,
    rewardsType: null
  }
  , {
    filterKey: null,
    filterValue: null,
    tabName: 'Food & Beverage',
    rewardsList: null,
    rewardsType: 'Food & Beverage'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Travel',
    rewardsList: null,
    rewardsType: 'Travel'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Electronics',
    rewardsList: null,
    rewardsType: 'Electronics'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Wellness',
    rewardsList: null,
    rewardsType: 'Wellness'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Entertainment',
    rewardsList: null,
    rewardsType: 'Entertainment'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Shopping',
    rewardsList: null,
    rewardsType: 'Shopping'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Merchant Self',
    rewardsList: null,
    rewardsType: 'Merchant Self'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Others',
    rewardsList: null,
    rewardsType: 'Others'
  },
];

@Component({
  selector: 'perx-blackcomb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public campaign$: Observable<ICampaign[]>;
  public rewards$: Observable<IReward[]>;
  public tabs$: BehaviorSubject<ITabConfigExtended[]> = new BehaviorSubject<ITabConfigExtended[]>([]);
  public staticTab: ITabConfigExtended[];
  private destroy$: Subject<any> = new Subject();

  constructor(
    private campaingService: ICampaignService,
    private rewardsService: RewardsService
  ) { }

  public ngOnInit(): void {
    this.campaign$ = this.campaingService.getCampaigns();
    this.rewards$ = this.rewardsService.getAllRewards(['featured']);
    this.staticTab = stubTabs;
    this.getTabedList();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTabedList(): void {
    this.tabs$.next(this.staticTab);
    forkJoin(this.staticTab.map((tab) =>
      this.rewardsService.getAllRewards(null, tab.rewardsType ? [tab.rewardsType] : null)
        .pipe(tap((reward) => {
          tab.rewardsList = of(reward);
          this.tabs$.next(this.staticTab);
          takeUntil(this.destroy$);
        }))
    )).subscribe(() => {
      this.tabs$.next(this.staticTab);
    });
  }
}
