import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, ILoyalty, LoyaltyService, RewardsService, IProfile, ITabConfigExtended } from '@perx/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, forkJoin, BehaviorSubject } from 'rxjs';
import { map, flatMap, finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

const studTabs: ITabConfigExtended[] = [
  {
    filterKey: null,
    filterValue: null,
    tabName: 'ALL',
    rewardsList: null,
    rewardsType: null
  }
  , {
    filterKey: null,
    filterValue: null,
    tabName: 'HOME+',
    rewardsList: null,
    rewardsType: 'Home+'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'HKBN',
    rewardsList: null,
    rewardsType: 'HKBN'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'HUNG_FOOK_TONG',
    rewardsList: null,
    rewardsType: 'Hung Fook Tong'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'BIG_BIG_SHOP',
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
    this.getRewardsForTags = this.getRewardsForTags.bind(this);
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

  private getRewardsForTags(tab: ITabConfigExtended): Observable<{ key: string, value: IReward[] }> {
    return this.rewardsService.getAllRewards(null, tab.tabName !== 'All' ? [tab.tabName] : null)
      .pipe(map((value) => ({ value, key: tab.tabName })));
  }

  private getTags(): Observable<ITabConfigExtended[]> {
    // todo: service not implemented yet
    // this.rewardsService.getTags()
    // JSON parese and stringify for creating complitly new object - important for test
    this.staticTab = JSON.parse(JSON.stringify(studTabs));
    this.tabs$.next(this.staticTab);
    return of(this.staticTab);
  }

  private getTabedRewards(): void {
    this.getTags().pipe(flatMap((tabs: ITabConfigExtended[]) => {
      return forkJoin(tabs.map((tab: ITabConfigExtended) => {
        return this.translate.get(tab.tabName).pipe(flatMap((name) => {
          tab.tabName = name;
          return this.rewardsService.getAllRewards();
        }), map((rewardsList) => tab.rewardsList = of(rewardsList)),
          finalize(() => {
            this.tabs$.next(this.staticTab);
          })
        );
      }));
    })).subscribe(() => {
      this.tabs$.next(this.staticTab);
    });
  }
}
