import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  BarSelectedItem,
  PageAppearence,
  PageProperties
} from '../page-properties';
import {
  ILoyalty,
  IPrice,
  IProfile,
  IReward,
  ITabConfigExtended,
  RewardsService
} from '@perxtech/core';
import {
  forkJoin,
  iif,
  Observable,
  of,
  Subject
} from 'rxjs';
import { Router } from '@angular/router';
import {
  finalize,
  flatMap,
  map,
  mergeMap,
  tap
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
  public displayPriceFn: (rewardPrice: IPrice) => Observable<string>;
  public subTitleFn: (loyalty: ILoyalty) => Observable<string>;
  public titleFn: (profile: IProfile) => Observable<string>;
  public summaryExpiringFn: (loyalty: ILoyalty) => Observable<string>;
  public pointToFn: () => Observable<string>;
  public memberFn: (membershipTierName: string) => Observable<string>;
  public membershipExpiryFn: (loyalty: ILoyalty) => Observable<string>;
  public currentTabIndex: number = 0;
  private pageSize: number = 10;
  public favDisabled: boolean  = false;
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
      .getAllRewards(undefined, undefined, this.translate.currentLang)
      .subscribe((rewards) => this.rewards = of(rewards));
    this.getRewards();
    this.initTranslate();
  }

  private getRewards(): void {
    this.getTags().pipe(flatMap((tags: ITabConfigExtended[]) => {
      this.tabs.next(tags);
      return forkJoin(tags.map((tab) =>
        this.rewardsService.getAllRewards(undefined, [tab.tabName], this.translate.currentLang)
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
    this.router.navigateByUrl('qr');
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
      this.translate.get('HOME.POINTS_EXPIRING').pipe(
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

    this.displayPriceFn = (rewardPrice: IPrice) => this.translate.get('REWARD.POINT').pipe(
      mergeMap(text => {
        if (rewardPrice.price && parseFloat(rewardPrice.price) > 0) {
          return of(`${rewardPrice.currencyCode} ${Math.floor(parseFloat(rewardPrice.price))}`);
        }

        if (rewardPrice.points && rewardPrice.points > 0) {
          return of(`${rewardPrice.points}${text}`);
        }
        return of(''); // is actually 0 or invalid value default
      })
    );
  }

  public rewardFavoriteHandler(rewardToggled: IReward): void {
    if (this.favDisabled) {
      return;
    }

    this.favDisabled = true;

    iif(() => (rewardToggled && (rewardToggled.favorite || false)),
    this.rewardsService.unfavoriteReward(rewardToggled.id),
    this.rewardsService.favoriteReward(rewardToggled.id)).pipe(
      tap(
        rewardChanged => {
          this.rewards = this.rewards.pipe(
            map(rewards => {
              const foundIndex = rewards.findIndex(reward => reward.id === rewardToggled.id);
              rewards[foundIndex] = rewardChanged;
              return rewards;
            })
          );
        }
      ),
      finalize(() => setTimeout(() => {
        this.favDisabled = false;
      }, 500))
    ).subscribe();
  }

}
