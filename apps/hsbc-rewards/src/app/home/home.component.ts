import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, RewardsService, LoyaltyService, ILoyalty, IProfile } from '@perxtech/core';
import { ITabConfig, IPrice } from '@perxtech/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { flatMap, map, filter } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';

const tabs: ITabConfig[] = [
  {
    filterKey: 'Lifestyle',
    filterValue: null,
    tabName: 'Lifestyle',
    rewardsList: undefined
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Travel',
    rewardsList: undefined
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Shopping',
    rewardsList: undefined
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Mileage',
    rewardsList: undefined
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Charity donation',
    rewardsList: undefined
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Annual fee',
    rewardsList: undefined
  }
];

interface PageTracker {
  [key: string]: { page: number, isLast: boolean };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public rewards: Observable<IReward[]>;
  public loyalty$: Observable<ILoyalty>;
  public tabs: Subject<ITabConfig[]> = new Subject<ITabConfig[]>();
  public staticTab: ITabConfig[] = tabs;
  public rewardsCollection: Observable<IReward[]>;
  public displayPriceFn: (price: IPrice) => string;
  public titleFn: (profile: IProfile) => Observable<string>;
  public subTitleFn: (loyalty: ILoyalty) => Observable<string>;
  public summaryExpiringFn: (loyalty: ILoyalty) => Observable<string>;
  public currentTab: string;
  private rewardMultiPageMetaTracker: PageTracker = {};
  private requestPageSize: number = 10;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private router: Router,
    private datePipe: DatePipe
    // private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.getRewardsCollection();
    this.getLoyalty();
    this.displayPriceFn = (rewardPrice: IPrice) => {
      if (rewardPrice.points && rewardPrice.points > 0 && rewardPrice.price && rewardPrice.price > 0) {
        return `Fast Track: ${rewardPrice.points} points + ${rewardPrice.currencyCode} ${parseInt((rewardPrice.price).toString(), 10)}`;
      }

      if (rewardPrice.price && rewardPrice.price > 0) {
        return `${rewardPrice.currencyCode} ${parseInt((rewardPrice.price).toString(), 10)}`;
      }

      if (rewardPrice.points && rewardPrice.points > 0) {
        return `${rewardPrice.points} points`;
      }
      return '0 points'; // is actually 0 or invalid value default
    };
    this.titleFn = (profile: IProfile) => {
      if (profile && profile.lastName) {
        return of(`Welcome ${profile.lastName},`);
      }
      return of('Welcome');
    };
    this.subTitleFn = () => of(`Your total points as of ${this.datePipe.transform(new Date(), 'ddMMMyy')}`);
    this.summaryExpiringFn = (): Observable<string> => of('');
    this.loadCurrentTabRewards(this.staticTab[0].tabName);
  }

  private getRewardsCollection(): void {
    this.rewardsCollection = this.rewardsService.getAllRewards(['featured']);
  }

  private loadCurrentTabRewards(tabName: string): void {
    this.rewardsService.getRewards(1, this.requestPageSize, undefined, [tabName])
      .pipe(map((res: IReward[]) => {
        this.rewardMultiPageMetaTracker[tabName] = { page: 1, isLast: false };
        return ({ key: tabName, value: res });
      })).subscribe((rewards) => {
        const tab: ITabConfig | undefined = this.staticTab.find((elem) => rewards.key === elem.tabName);
        if (!tab) {
          return;
        }
        tab.rewardsList = of(rewards.value);
        this.tabs.next(this.staticTab);
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

  // private getTags(): Observable<ITabConfig[]> {
  //   // todo: service not implemented yet
  //   // this.rewardsService.getTags();
  //   this.staticTab = tabs;
  //   this.tabs.next(this.staticTab);
  //   this.cd.detectChanges();
  //   return of(tabs);
  // }

  public tabChanged(event: MatTabChangeEvent): void {
    this.currentTab = event.tab.textLabel;
    this.loadCurrentTabRewards(this.currentTab);
  }

  public openRewardDetails(tab: IReward): void {
    this.router.navigate([`detail/element/${tab.id}`]);
  }

  public onScroll(): void {
    if (!this.rewardMultiPageMetaTracker[this.currentTab].isLast) {
      let rewards;
      this.rewardsService.getRewards(this.rewardMultiPageMetaTracker[this.currentTab].page + 1, 10, undefined, [this.currentTab]).pipe(
        flatMap((newRewards: IReward[]) => {
          rewards = newRewards;
          if (newRewards.length === 0 || newRewards.length < this.requestPageSize) {
            this.rewardMultiPageMetaTracker[this.currentTab].isLast = true;
          } else {
            this.rewardMultiPageMetaTracker[this.currentTab].page += 1;
          }
          const tab = tabs.find(el => el.tabName === this.currentTab);
          if (tab && tab.rewardsList) {
            return tab.rewardsList;
          }
          return throwError({ message: 'can not find reward list' });
        })
      ).subscribe(
        (existingRewards: IReward[]) => {
          const tab = tabs.find(el => el.tabName === this.currentTab);
          if (tab) {
            tab.rewardsList = of(existingRewards.concat(rewards));
          }
        },
        (err) => console.log(err)
      );
    }
  }
}
