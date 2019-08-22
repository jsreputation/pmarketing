import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, RewardsService, LoyaltyService, ILoyalty } from '@perx/core';
import { ITabConfig } from '@perx/core';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of, Subject, forkJoin } from 'rxjs';

const tabs: ITabConfig[] = [
  {
    filterKey: 'Lifestyle',
    filterValue: null,
    tabName: 'Lifestyle',
    rewardsList: null
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Travel',
    rewardsList: null
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Shopping',
    rewardsList: null
  }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public rewards: Observable<IReward[]>;
  public loyalty$: Observable<ILoyalty>;
  public tabs: Subject<ITabConfig[]> = new Subject<ITabConfig[]>();
  public staticTab: ITabConfig[];
  public rewardsCollection: Observable<IReward[]>;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.getRewards();
    this.getRewardsCollection();
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

  public getRewardsCollection(): void {
    this.rewardsService.getAllRewards(['featured']).subscribe((val) => {
      this.rewardsCollection = of(val);
    });
  }

  public getRewards(): void {
    this.getTags().pipe(mergeMap((tags: ITabConfig[]) => {
      this.tabs.next(tags);
      return forkJoin(tags.map((tab) => {
        return this.rewardsService.getAllRewards(null, [tab.tabName])
        .pipe(map((result:IReward[]) => { return { key: tab.tabName, value: result } }));
      }));
    })).subscribe((result) => {
      result.forEach((rewards) => {
        this.staticTab.find((elem)=>rewards.key === elem.tabName).rewardsList = of(rewards.value);
        this.tabs.next(this.staticTab);
      });
    });
  }

  public getTags(): Observable<ITabConfig[]> {
    // todo: service not implemented yet
    // this.rewardsService.getTags();
    this.staticTab = tabs;
    this.tabs.next(this.staticTab);
    this.cd.detectChanges();
    return of(tabs);
  }

  public openRewardDetails(tab: IReward): void {
    this.router.navigate([`detail/element/${tab.id}`]);
  }

}
