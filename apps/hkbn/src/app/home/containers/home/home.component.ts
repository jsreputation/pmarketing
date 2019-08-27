import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, ILoyalty, LoyaltyService, RewardsService, IProfile, ITabConfig } from '@perx/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
// import { filter, map } from 'rxjs/operators';

const staticTabs: ITabConfig[] = [
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
  public rewards$: Observable<IReward[]>;
  public tabs: Subject<ITabConfig[]> = new Subject<ITabConfig[]>();
  public staticTab: ITabConfig[];
  constructor(
    private router: Router,
    private loyaltyService: LoyaltyService,
    private translate: TranslateService,
    private rewardsService: RewardsService
  ) { }

  public goToReward(reward: IReward): void {
    this.router.navigate(['/reward', reward.id]);
  }

  public ngOnInit(): void {
    this.getRewards();
    this.rewardsService.getAllRewards(['featured']).subscribe((rewards) => {
      this.rewards$ = of(rewards);
    });
    this.loyaltyService.getLoyalty()
      .subscribe(
        (loyalty: ILoyalty) => this.loyalty = loyalty
      );

    this.translate.get('YOU_HAVE')
      .subscribe((res: string) => {
        this.subTitleFn = () => res;
      });
    this.translate.get('HELLO')
      .subscribe((res: string) => {
        this.titleFn = () => res;
      });
  }

  private getRewards(): void {
    this.getTags().pipe(flatMap(() => {
      return forkJoin(this.staticTab.map((tab) => this.rewardsService
        .getAllRewards(null, tab.tabName !== 'All' ? [tab.tabName] : null).pipe(map((value) => ({ value, key: tab.tabName })))));
    })).pipe(flatMap((reward) => {
      this.staticTab.forEach((tab) => tab.rewardsList = of(reward.find((rew) => rew.key === tab.tabName).value));
      return forkJoin(this.staticTab.filter((el) => keysTranslate[el.tabName]).map((tab) => this.translate.get(keysTranslate[tab.tabName])
        .pipe(map((value) => ({ value, key: tab.tabName })))));
    })).subscribe((names) => {
      this.staticTab.forEach((tab) => tab.tabName = names
        .find((rew) => rew.key === tab.tabName) ? names.find((rew) => rew.key === tab.tabName).value :
        tab.tabName);
      this.tabs.next(this.staticTab);
    });
  }

  private getTags(): Observable<ITabConfig[]> {
    // todo: service not implemented yet
    // this.rewardsService.getTags()
    this.staticTab = staticTabs;
    this.tabs.next(this.staticTab);
    return of(staticTabs);
  }
}
