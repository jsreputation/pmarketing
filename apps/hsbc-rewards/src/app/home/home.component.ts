import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, RewardsService, LoyaltyService, ILoyalty, IProfile } from '@perx/core';
import { ITabConfig, IPrice } from '@perx/core';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { flatMap, map, filter } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';

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
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Mileage',
    rewardsList: null
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Charity donation',
    rewardsList: null
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Annual fee',
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
  public displayPriceFn: (price: IPrice) => string;
  public titleFn: (profile: IProfile) => string;
  public currentTab: string;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.getRewardsCollection();
    this.getLoyalty();
    this.displayPriceFn = (rewardPrice: IPrice) => {
      if (rewardPrice.points > 0 && rewardPrice.price > 0) {
        return `Fast Track: ${rewardPrice.points} points + ${rewardPrice.currencyCode} ${parseFloat((rewardPrice.price).toString()).toFixed(2)}`;
      }

      if (rewardPrice.price > 0) {
        return `${rewardPrice.currencyCode} ${parseFloat((rewardPrice.price).toString()).toFixed(2)}`;
      }

      if (rewardPrice.points > 0) {
        return `${rewardPrice.points} points`;
      }
      return '0 points'; // is actually 0 or invalid value default
    };
    this.titleFn = (profile: IProfile) => {
      if (profile && profile.lastName) {
        return `Welcome ${profile.lastName},`;
      }
      return `Welcome`;
    };
    this.initRewards();
  }

  private getRewardsCollection(): void {
    this.rewardsCollection = this.rewardsService.getAllRewards(['featured']);
  }

  private initRewards(): void {
    this.getTags().pipe(flatMap((tags: ITabConfig[]) => {
      this.tabs.next(tags);
      return forkJoin(tags.map((tab) => {
        return this.rewardsService.getRewards(1, 10, null, [tab.tabName])
          .pipe(map((result: IReward[]) => ({key: tab.tabName, value: result})));
      }));
    })).subscribe((result) => {
      result.forEach((rewards) => {
        this.staticTab.find((elem) => rewards.key === elem.tabName).rewardsList = of(rewards.value);
        this.tabs.next(this.staticTab);
      });
    });
  }

  private getLoyalty(): void {
    this.loyaltyService.getLoyalties()
      .pipe(
        filter((loyalties: ILoyalty[]) => loyalties.length > 0),
        map((loyalties: ILoyalty[]) => loyalties[0])
      )
      .subscribe((loyalty: ILoyalty) => this.loyalty$ = this.loyaltyService.getLoyalty(loyalty.id));
  }

  private getTags(): Observable<ITabConfig[]> {
    // todo: service not implemented yet
    // this.rewardsService.getTags();
    this.staticTab = tabs;
    this.tabs.next(this.staticTab);
    this.cd.detectChanges();
    return of(tabs);
  }

  public tabChanged(event: MatTabChangeEvent): void {
    this.currentTab = event.tab.textLabel;
  }

  public openRewardDetails(tab: IReward): void {
    this.router.navigate([`detail/element/${tab.id}`]);
  }

  public onScroll(): void {
    this.rewardsService.getNextPageRewards(10, null, [this.currentTab]).subscribe(
      (newRewards: IReward[]) => {
        const rewardsList = tabs.find(tab => tab.tabName === this.currentTab).rewardsList.subscribe(
          (existingRewards: IReward[]) => {
            tabs.find(tab => tab.tabName === this.currentTab).rewardsList = of(existingRewards.concat(newRewards));
          });
      },
      (err) => console.log(err)
    );
  }
}
