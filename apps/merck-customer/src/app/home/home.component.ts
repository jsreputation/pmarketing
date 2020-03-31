import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { IReward, RewardsService, IProfile, ILoyalty, ITabConfigExtended } from '@perxtech/core';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatTabChangeEvent } from '@angular/material';

const tabs: ITabConfigExtended[] = [
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Diabetes',
    rewardsType: 'Diabetes',
    rewardsList: undefined,
    currentPage: 1
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Category 2',
    rewardsType: 'Category 2',
    rewardsList: undefined,
    currentPage: 1
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Category 3',
    rewardsType: 'Category 3',
    rewardsList: undefined,
    currentPage: 1
  }
];

@Component({
  selector: 'mc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, PageAppearence {
  public titleFn: (profile: IProfile) => string;
  public rewards: Observable<IReward[]>;
  public tabs: Subject<ITabConfigExtended[]> = new Subject<ITabConfigExtended[]>();
  public staticTab: ITabConfigExtended[];
  public subTitleFn: (loyalty: ILoyalty) => string;
  public currentTabIndex: number = 0;
  private pageSize: number = 10;
  public constructor(
    private rewardsService: RewardsService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private translate: TranslateService
  ) {
  }

  public ngOnInit(): void {
    this.translate.get('WELCOME').subscribe(
      (msg) => this.titleFn = (profile) => {
        let returnString = msg;
        if (profile && profile.firstName && profile.firstName !== '') {
          returnString = `${returnString}, ${profile.firstName}`;
        } else if (profile && profile.lastName && profile.lastName !== '') {
          returnString = `${returnString}, ${profile.lastName}`;
        }
        return returnString;
      }
    );
    this.rewardsService
      .getAllRewards()
      .subscribe((rewards) => this.rewards = of(rewards));
    this.getRewards();
    this.translate.get('TOTAL_POINTS').subscribe((msg) => this.subTitleFn = () => msg);
  }

  private getRewards(): void {
    this.getTags().pipe(flatMap((tags: ITabConfigExtended[]) => {
      this.tabs.next(tags);
      return forkJoin(tags.map((tab) => this.rewardsService.getAllRewards(undefined, [tab.tabName])
        .pipe(map((result: IReward[]) => ({ key: tab.tabName, value: result })))));
    })).subscribe((result) => {
      result.forEach((rewards) => {
        const reward = this.staticTab.find((elem) => rewards.key === elem.tabName);
        if (!reward) {
          return;
        }
        reward.rewardsList = of(rewards.value);
        this.tabs.next(this.staticTab);
      });
    });
  }

  private getTags(): Observable<ITabConfigExtended[]> {
    // todo: service not implemented yet
    // this.rewardsService.getTags();
    this.staticTab = tabs;
    this.tabs.next(this.staticTab);
    this.cd.detectChanges();
    return of(tabs);
  }

  public myQrClicked(): void {
    this.router.navigateByUrl('redeem');
  }

  public rewardClicked(reward: IReward): void {
    this.router.navigateByUrl(`reward-detail/${reward.id}`);
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: false,
      bottomSelectedItem: BarSelectedItem.HOME,
      pageTitle: ''
    };
  }

  public tabChanged(event: MatTabChangeEvent): void {
    this.currentTabIndex = event.index;
  }

  public onScroll(): void {
    const stTab = this.staticTab[this.currentTabIndex];
    if (!stTab || !stTab.rewardsList) {
      return;
    }
    if (!stTab.rewardsList) {
      stTab.rewardsList = of([]);
    }
    stTab.currentPage = stTab.currentPage ? ++stTab.currentPage : 1;
    forkJoin(this.rewardsService.getRewards(
      stTab.currentPage,
      this.pageSize,
      undefined,
      stTab.tabName !== 'All' ? [stTab.tabName] : undefined), stTab.rewardsList
    ).subscribe((val) => stTab.rewardsList = of([...val[1], ...val[0]]));
  }
}
