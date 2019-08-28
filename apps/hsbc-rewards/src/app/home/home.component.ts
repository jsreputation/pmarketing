import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {IReward, RewardsService, LoyaltyService, ILoyalty} from '@perx/core';
import {ITabConfig} from '@perx/core';
import {Observable, of, Subject, forkJoin} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {IPrice} from '../../../../../libs/perx-core/projects/perx-core/src/lib/rewards/models/reward.model';

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
  public displayPriceFn: (price: IPrice) => string;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.getRewardsCollection();
    this.getRewards();
    this.loyaltyService.getLoyalties().subscribe(
      (loyalties: ILoyalty[]) => {
        this.loyalty$ = this.loyaltyService.getLoyalty(loyalties[0].id);
      }
    );

    this.displayPriceFn = (rewardPrice: IPrice) => {
      if (rewardPrice.points > 0 && rewardPrice.price > 0) {
        return `Fast Track: ${rewardPrice.points} points + ${rewardPrice.currencyCode} ${rewardPrice.price}`;
      }

      if (rewardPrice.price > 0) {
        return `${rewardPrice.currencyCode} ${rewardPrice.price}`;
      }

      if (rewardPrice.points > 0) {
        return `${rewardPrice.points} points`;
      }
      return '0 points'; // is actually 0 or invalid value default
    };
  }

  private getRewardsCollection(): void {
    this.rewardsService.getAllRewards(['featured']).subscribe((val) => {
      this.rewardsCollection = of(val);
    });
  }

  private getRewards(): void {

    this.getTags().pipe(flatMap((tags: ITabConfig[]) => {
      this.tabs.next(tags);
      return forkJoin(tags.map((tab) => {
        return this.rewardsService.getAllRewards(null, [tab.tabName])
          .pipe(map((result: IReward[]) => ({key: tab.tabName, value: result})));
      }));
    })).subscribe((result) => {
      result.forEach((rewards) => {
        this.staticTab.find((elem) => rewards.key === elem.tabName).rewardsList = of(rewards.value);
        this.tabs.next(this.staticTab);
      });
    });
  }

  private getTags(): Observable<ITabConfig[]> {
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
