import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { IReward, RewardsService, IProfile, ILoyalty, ITabConfigExtended } from '@perxtech/core';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { flatMap, map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatTabChangeEvent } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, PageAppearence {
  public rewards: Observable<IReward[]>;
  public tabs: Subject<ITabConfigExtended[]> = new Subject<ITabConfigExtended[]>();
  public staticTab: ITabConfigExtended[];
  public subTitleFn: (loyalty: ILoyalty) => Observable<string>;
  public titleFn: (profile: IProfile) => Observable<string>;
  public summaryExpiringFn: (loyalty: ILoyalty) => Observable<string>;
  public pointToFn: () => Observable<string>;
  public memberFn: (membershipTierName: string) => Observable<string>;
  public membershipExpiryFn: (loyalty: ILoyalty) => Observable<string>;
  public currentTabIndex: number = 0;
  private pageSize: number = 10;
  public constructor(
    private rewardsService: RewardsService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) {
  }

  public ngOnInit(): void {
    
    this.rewardsService
      .getAllRewards()
      .subscribe((rewards) => this.rewards = of(rewards));
    this.getRewards();
    this.initTranslate();
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
    return this.rewardsService.getCategories().pipe(
      tap((tabs: ITabConfigExtended[]) => {
        this.staticTab = tabs;
        this.tabs.next(this.staticTab);
        this.cd.detectChanges();
      })
    );
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

  private initTranslate(): void {
    this.subTitleFn = () => this.translate.get('HOME.TOTAL_POINTS');
    this.titleFn = (profile: IProfile) => this.translate.get('HOME.WELCOME').pipe(
      map(msg => {
        let returnString = msg;
        if (profile && profile.firstName && profile.firstName !== '') {
          returnString = `${returnString}, ${profile.firstName}`;
        } else if (profile && profile.lastName && profile.lastName !== '') {
          returnString = `${returnString}, ${profile.lastName}`;
        }
        return returnString;
      })
    );
    this.summaryExpiringFn = (loyalty: ILoyalty) =>
      this.translate.get('HOME.POINTS_EXPITING').pipe(
        map(res => loyalty && loyalty.expiringPoints && loyalty.expiringPoints.length && loyalty.expiringPoints[0].points &&
          loyalty.expiringPoints[0].points !== 0 ?
          res
            .replace('{{points}}', (loyalty.expiringPoints[0].points ? loyalty.expiringPoints[0].points : 0).toString())
            .replace('{{date}}', loyalty.expiringPoints[0].expireDate ?
              this.datePipe.transform(loyalty.expiringPoints[0].expireDate, 'd MMM y') : '')
          : '')
      );
    this.pointToFn = () => this.translate.get('HOME.POINT_TO');
    this.memberFn = (membershipTierName: string) => this.translate.get('HOME.MEMBER').pipe(
      map(res => `${membershipTierName}${res}`)
    );
    this.membershipExpiryFn = (loyalty: ILoyalty) => loyalty && loyalty.membershipExpiry ?
      this.translate.get('HOME.ACCOUNT_EXPIRE').pipe(
        map(res => `${res}: ${this.datePipe.transform(loyalty.membershipExpiry, 'mediumDate')}`)
      ) : of('');
  }

}
