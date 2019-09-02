import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, ILoyalty, LoyaltyService, RewardsService, IProfile, ITabConfig } from '@perx/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

const studTabs: ITabConfig[] = [
  {
    filterKey: null,
    filterValue: null,
    tabName: 'All',
    rewardsList: null
  }
  , {
    filterKey: null,
    filterValue: null,
    tabName: 'Home+',
    rewardsList: null
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'HKBN',
    rewardsList: null
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Hung Fook Tong',
    rewardsList: null
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'big big shop',
    rewardsList: null
  }
];

const keysTranslate = {
  All: 'ALL',
  'Home+': 'HOME+',
  HKBN: 'HKBN',
  'Hung Fook Tong': 'HUNG_FOOK_TONG',
  'big big shop': 'BIG_BIG_SHOP'
};

@Component({
  selector: 'hkbn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loyalty: ILoyalty;
  public subTitleFn: (loyalty: ILoyalty) => string;
  public titleFn: (profile: IProfile) => string;
  public summaryExpiringFn: (loyalty: ILoyalty) => string;
  public rewards$: Observable<IReward[]>;

  public tabs: Subject<ITabConfig[]> = new Subject<ITabConfig[]>();
  public staticTab: ITabConfig[];
  constructor(
    private router: Router,
    private loyaltyService: LoyaltyService,
    private translate: TranslateService,
    private rewardsService: RewardsService,
    private datePipe: DatePipe
  ) {
    this.getRewardsForTags = this.getRewardsForTags.bind(this);
  }

  public goToReward(reward: IReward): void {
    this.router.navigate(['/reward', reward.id]);
  }

  public ngOnInit(): void {
    this.getRewards();
    this.rewards$ = this.rewardsService.getAllRewards(['featured']);
    this.loyaltyService.getLoyalty()
      .subscribe(
        (loyalty: ILoyalty) => {
          this.loyalty = loyalty;
        });
    this.translate.get('YOU_HAVE')
      .subscribe((res: string) => {
        this.subTitleFn = () => res;
      });
    this.translate.get('HELLO')
      .subscribe((res: string) => {
        this.titleFn = () => res;
      });

    this.translate.get('POINTS_EXPITING')
      .subscribe((res: string) => {
        this.summaryExpiringFn = (loyalty: ILoyalty) => {

          if (!loyalty || !loyalty.expiringPoints || !loyalty.expiringPoints.length) {
            return '';
          }
          const expiringPoints = loyalty.expiringPoints[0];
          if (!expiringPoints.expireDate || !expiringPoints.points) {
            return '';
          }
          return loyalty ? res
            .replace('{{points}}', expiringPoints.points.toString())
            .replace('{{date}}', this.datePipe.transform(expiringPoints.expireDate, 'd MMM y')) : null;
        };
      });

  }

  private getRewards(): void {
    this.getTags().pipe(flatMap(() => {
      return forkJoin(this.staticTab.map(this.getRewardsForTags));
    })).pipe(flatMap((reward) => {
      this.staticTab.forEach((tab) => tab.rewardsList = of(reward.find((rew) => rew.key === tab.tabName).value));
      return this.getTranslatedTabsName();
    })).subscribe((names) => {
      if (names) {
        this.staticTab.forEach((tab) => tab.tabName = names[tab.tabName]);
      }
      this.tabs.next(this.staticTab);
    });
  }
  private getRewardsForTags(tab: ITabConfig): Observable<{ key: string, value: IReward[] }> {
    return this.rewardsService.getAllRewards(null, tab.tabName !== 'All' ? [tab.tabName] : null)
      .pipe(map((value) => ({ value, key: tab.tabName })));
  }
  private getTranslatedTabsName(): Observable<any> {
    const searchWords = this.staticTab.map(el => keysTranslate[el.tabName]).filter((el) => el);
    return searchWords && searchWords.length ? this.translate.get(searchWords)
      .pipe(map((dictioniry) => {
        return Object.entries(keysTranslate).reduce((newObj, [key, val]) => {
          newObj[key] = dictioniry[val];
          return newObj;
        }, {});
      })) : of(null);
  }
  private getTags(): Observable<ITabConfig[]> {
    // todo: service not implemented yet
    // this.rewardsService.getTags()
    // JSON parese and stringify for creating complitly new object - important for test
    this.staticTab = JSON.parse(JSON.stringify(studTabs));
    this.tabs.next(this.staticTab);
    return of(this.staticTab);
  }
}
