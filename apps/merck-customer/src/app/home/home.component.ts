import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { IReward, RewardsService, ITabConfig, IProfile, ILoyalty } from '@perx/core';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

const tabs: ITabConfig[] = [
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Diabetes',
    rewardsList: null
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Category 2',
    rewardsList: null
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Category 3',
    rewardsList: null
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
  public tabs: Subject<ITabConfig[]> = new Subject<ITabConfig[]>();
  public staticTab: ITabConfig[];
  public subTitleFn: (loyalty: ILoyalty) => string;

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
          returnString =  returnString + ', ' + profile.firstName;
        } else if (profile && profile.lastName && profile.lastName !== '') {
          returnString =  returnString + ', ' + profile.lastName;
        }
        return returnString;
      }
    );
    this.rewardsService
      .getAllRewards()
      .subscribe((rewards) => this.rewards = of(rewards));
    this.getRewards();
    this.translate.get('TOTAL_POINTS').subscribe((msg) => this.subTitleFn = (loyalty) => loyalty.pointsBalance + ' ' + msg);
  }

  private getRewards(): void {
    this.getTags().pipe(flatMap((tags: ITabConfig[]) => {
      this.tabs.next(tags);
      return forkJoin(tags.map((tab) => {
        return this.rewardsService.getAllRewards(null, [tab.tabName])
          .pipe(map((result: IReward[]) => ({ key: tab.tabName, value: result })));
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
}
