import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, RewardsService, LoyaltyService, ILoyalty } from '@perx/core';
import { ITabConfig } from '@perx/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of, Subject, forkJoin } from 'rxjs';

const tabs: ITabConfig[] = [
  {
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
export class HomeComponent implements OnInit {
  public rewards: Observable<IReward[]>;
  public loyalty$: Observable<ILoyalty>;
  public tabs: Subject<ITabConfig[]> = new Subject<ITabConfig[]>();
  public staticTab: ITabConfig[];
  public rewardsCollection: Observable<IReward[]>;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.getRewardsCollection();
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

  public getRewardsCollection(): void {
    this.rewardsCollection = this.rewardsService.getAllRewards();
  }

  public getRewards(): void {
    this.getTags().pipe(switchMap((tags: ITabConfig[]) => {
      return forkJoin(tags.map((tab) => {
        return this.rewardsService.getAllRewards(null, tab.tabName === 'All Rewards' ? null : [tab.tabName]);
      }));
    })).subscribe((result) => {
      result.forEach((rewards: IReward[], index) => {
        this.staticTab[index].rewardsList = of(rewards);
        this.tabs.next(this.staticTab);
      });
    });
  }

  public getTags(): Observable<ITabConfig[]> {
    // todo: service not implemented yet
    // this.rewardsService.getTags();
    this.staticTab = tabs;
    return of(tabs);
  }

  public openRewardDetails(tab: IReward): void {
    this.router.navigate([`detail/element/${tab.id}`]);
  }

}
