import { Component, OnInit } from '@angular/core';
import { ICampaignService, ICampaign, RewardsService, IReward, ITabConfigExtended } from '@perx/core';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    tabName: 'Category 1',
    rewardsList: null,
    rewardsType: 'CATEGORY_1'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Category 2',
    rewardsList: null,
    rewardsType: 'CATEGORY_2'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Category 3',
    rewardsList: null,
    rewardsType: 'CATEGORY_3'
  }
];

@Component({
  selector: 'perx-blackcomb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public campaign$: Observable<ICampaign[]>;
  public rewards$: Observable<IReward[]>;
  public tabs$: BehaviorSubject<ITabConfigExtended[]> = new BehaviorSubject<ITabConfigExtended[]>([]);
  public staticTab: ITabConfigExtended[];
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

  private getTabedList(): void {
    this.tabs$.next(this.staticTab);
    forkJoin(this.staticTab.map((tab) =>
      this.rewardsService.getAllRewards(null, tab.rewardsType ? [tab.rewardsType] : null)
        .pipe(tap((reward) => {
          tab.rewardsList = of(reward);
          this.tabs$.next(this.staticTab);
        }))
    )).subscribe(() => {
      this.tabs$.next(this.staticTab);
    });
  }
}
