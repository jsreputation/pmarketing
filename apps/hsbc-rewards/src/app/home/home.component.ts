import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, RewardsService, LoyaltyService, ILoyalty, IProfile } from '@perx/core';
import { ITabConfig, IPrice } from '@perx/core';
import { Observable, of, Subject } from 'rxjs';
import { flatMap, map, filter } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {DatePipe} from '@angular/common';

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
  public titleFn: (profile: IProfile) => string;
  public subTitleFn: (loyalty: ILoyalty) => string;
  public summaryExpiringFn: (loyalty: ILoyalty) => string;
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
      if (rewardPrice.points > 0 && rewardPrice.price > 0) {
        return `Fast Track: ${rewardPrice.points} points + ${rewardPrice.currencyCode} ${parseInt((rewardPrice.price).toString(), 10)}`;
      }

      if (rewardPrice.price > 0) {
        return `${rewardPrice.currencyCode} ${parseInt((rewardPrice.price).toString(), 10)}`;
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
    this.subTitleFn = () => `Your total points as of ${this.datePipe.transform(new Date(), 'ddMMMyy')}`;
    this.summaryExpiringFn = (): string => '';
    this.loadCurrentTabRewards(this.staticTab[0].tabName);
  }

  private getRewardsCollection(): void {
    this.rewardsCollection = this.rewardsService.getAllRewards(['featured']);
  }

  private loadCurrentTabRewards(tabName: string): void {
    this.rewardsService.getRewards(1, this.requestPageSize, null, [tabName])
      .pipe(map((res: IReward[]) => {
        this.rewardMultiPageMetaTracker[tabName] = { page: 1, isLast: false };
        return ({ key: tabName, value: res });
      })).subscribe((rewards) => {
        this.staticTab.find((elem) => rewards.key === elem.tabName).rewardsList = of(rewards.value);
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
      this.rewardsService.getRewards(this.rewardMultiPageMetaTracker[this.currentTab].page + 1, 10, null, [this.currentTab]).pipe(
        flatMap((newRewards: IReward[]) => {
          rewards = newRewards;
          if (newRewards.length === 0 || newRewards.length < this.requestPageSize) {
            this.rewardMultiPageMetaTracker[this.currentTab].isLast = true;
          } else {
            this.rewardMultiPageMetaTracker[this.currentTab].page += 1;
          }
          return tabs.find(tab => tab.tabName === this.currentTab).rewardsList;
        })
      ).subscribe(
        (existingRewards: IReward[]) => {
          tabs.find(tab => tab.tabName === this.currentTab).rewardsList = of(existingRewards.concat(rewards));
        },
        (err) => console.log(err)
      );
    }
  }
}
