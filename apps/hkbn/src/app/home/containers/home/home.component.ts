import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, ILoyalty, LoyaltyService, RewardsService, IProfile, ITabConfigExtended } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, forkJoin, BehaviorSubject } from 'rxjs';
import { map, flatMap, finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

const stubTabs: ITabConfigExtended[] = [
  {
    filterKey: null,
    filterValue: null,
    tabName: 'HOME.ALL',
    rewardsList: null,
    rewardsType: null
  }
  , {
    filterKey: null,
    filterValue: null,
    tabName: 'HOME.HOME+',
    rewardsList: null,
    rewardsType: 'Home+'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'HOME.HKBN',
    rewardsList: null,
    rewardsType: 'HKBN'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'HOME.HUNG_FOOK_TONG',
    rewardsList: null,
    rewardsType: 'Hung Fook Tong'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'HOME.BIG_BIG_SHOP',
    rewardsList: null,
    rewardsType: 'big big shop'
  }
];

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

  public tabs$: BehaviorSubject<ITabConfigExtended[]> = new BehaviorSubject<ITabConfigExtended[]>([]);
  public staticTab: ITabConfigExtended[];
  constructor(
    private router: Router,
    private loyaltyService: LoyaltyService,
    private translate: TranslateService,
    private rewardsService: RewardsService,
    private datePipe: DatePipe
  ) {
  }

  public goToReward(reward: IReward): void {
    this.router.navigate(['/reward', reward.id]);
  }

  public ngOnInit(): void {
    this.rewards$ = this.rewardsService.getAllRewards(['featured']);
    this.getTabedRewards();
    this.loyaltyService.getLoyalty()
      .subscribe(
        (loyalty: ILoyalty) => {
          this.loyalty = loyalty;
        });
    this.translate.get(['HOME.YOU_HAVE', 'HOME.HELLO', 'HOME.POINTS_EXPITING'])
      .subscribe((res: any) => {
        this.subTitleFn = () => res.YOU_HAVE;
        this.titleFn = (profile: IProfile) => `${res.HELLO} ${profile.lastName},`;
        this.summaryExpiringFn = (loyalty: ILoyalty) =>
          loyalty && loyalty.expiringPoints && loyalty.expiringPoints.length && loyalty.expiringPoints[0].points &&
            loyalty.expiringPoints[0].points !== 0 ? res.POINTS_EXPITING
              .replace('{{points}}', (loyalty.expiringPoints[0].points ? loyalty.expiringPoints[0].points : 0)
                .toString())
              .replace('{{date}}', loyalty.expiringPoints[0].expireDate ?
                this.datePipe.transform(loyalty.expiringPoints[0].expireDate, 'd MMM y') : '') : '';
      });

  }

  private getTags(): Observable<ITabConfigExtended[]> {
    // todo: service not implemented yet
    // this.rewardsService.getTags()
    // JSON parese and stringify for creating complitly new object - important for test
    this.staticTab = JSON.parse(JSON.stringify(stubTabs));
    this.tabs$.next(this.staticTab);
    return of(this.staticTab);
  }

  private getTabedRewards(): void {
    this.getTags().pipe(
      flatMap(
        (tabs: ITabConfigExtended[]) => forkJoin(
          tabs.map((tab: ITabConfigExtended) => this.translate.get(tab.tabName)
            .pipe(
              flatMap((name) => {
                tab.tabName = name;
                return this.rewardsService.getAllRewards(null, tab.rewardsType ? [tab.rewardsType] : null);
              }),
              map((rewardsList) => tab.rewardsList = of(rewardsList)),
              finalize(() => this.tabs$.next(this.staticTab))
            ))
        )
      )
    ).subscribe(() => this.tabs$.next(this.staticTab));
  }
}
