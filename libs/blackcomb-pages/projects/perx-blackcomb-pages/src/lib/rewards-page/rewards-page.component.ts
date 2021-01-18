import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  of,
  Subject
} from 'rxjs';
import { IPrice, IReward, ITabConfig, ITabConfigExtended, RewardsService } from '@perxtech/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  map,
  mergeMap,
  startWith,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'perx-blackcomb-pages-rewards-page',
  templateUrl: './rewards-page.component.html',
  styleUrls: ['./rewards-page.component.scss'],
})
export class RewardsPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public constructor(
    protected rewardsService: RewardsService,
    private router: Router
  ) {}

  @Input()
  public rewards?: Observable<IReward[]>;

  public tabs$: BehaviorSubject<ITabConfigExtended[]> = new BehaviorSubject<
    ITabConfigExtended[]
    >([]);

  public displayPriceFn: (rewardPrice: IPrice) => Observable<string> = (
    rewardPrice: IPrice,
  ) => {
    if (rewardPrice.price && parseFloat(rewardPrice.price) > 0) {
      if (rewardPrice.points && rewardPrice.points > 0) {
        return of(
          `${rewardPrice.currencyCode} ${rewardPrice.price} and ${rewardPrice.points} points`,
        );
      }
      return of(`${rewardPrice.currencyCode} ${rewardPrice.price}`);
    }

    if (rewardPrice.points && rewardPrice.points > 0) {
      return of(`${rewardPrice.points} points`);
    }
    return of(''); // is actually 0 or invalid value default
  }

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  public staticTabs: ITabConfigExtended[];
  public currentTabIndex: number = 0;
  private pageSize: number = 10;
  public searchControl: FormControl = new FormControl();
  public filteredRwdRewardNames: Observable<string[]>;
  public filteredRwdMerchantNames: Observable<string[]>;
  public currentTabRewardsList?: Observable<IReward[]>;
  public filteredRewards?: Observable<IReward[]>;

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getTabbedList(): void {
    this.rewardsService.getCategories().pipe(
      mergeMap((tabs) =>
        forkJoin(
          tabs.map((tab) =>
            this.rewardsService
              .getRewards(
                1,
                this.pageSize,
                undefined,
                tab.rewardsType ? [tab.rewardsType] : undefined,
              )
              .pipe(
                map((reward) => {
                  tab.currentPage = 1;
                  tab.rewardsList = of(reward);
                  tab.rewardNames = reward
                    ? reward.reduce(
                      (accumulatedNames: string[], rewardIdv: IReward) => [
                        ...accumulatedNames,
                        rewardIdv.name,
                      ],
                      [],
                    )
                    : [];
                  tab.merchantNames = reward
                    ? reward.reduce(
                      (accumulatedNames: string[], rewardIdv: IReward) => [
                        ...accumulatedNames,
                        rewardIdv.merchantName || '',
                      ],
                      [],
                    )
                    : [];
                  return tab;
                }),
                takeUntil(this.destroy$),
              ),
          )
        )
      )
    ).subscribe((tabs) => {
      this.staticTabs = tabs;
      this.tabs$.next(this.staticTabs);
    });
  }

  public ngOnInit(): void {
    this.getTabbedList();

    this.filteredRwdRewardNames = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((value) => this.filterRewardsNamesSearch(value)),
    );

    this.filteredRwdMerchantNames = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((value) => this.filterMerchantNamesSearch(value)),
    );

    this.currentTabRewardsList = this.tabs$.pipe(
      map((tabs) => tabs[this.currentTabIndex]),
      switchMap((tab) => {
        if (tab && tab.rewardsList) {
          return tab.rewardsList as Observable<IReward[]>;
        }
        return of([]) as Observable<IReward[]>;
      }),
    );

    this.filteredRewards = combineLatest(
      this.currentTabRewardsList,
      this.filteredRwdRewardNames,
      this.filteredRwdMerchantNames,
    ).pipe(
      map(
        ([rewards, rewardNames, merchantNames]: [
          IReward[],
          string[],
          string[],
        ]) => rewards.filter(
          (reward: IReward) =>
            rewardNames.includes(reward.name) ||
              (reward.merchantName &&
                merchantNames.includes(reward.merchantName)),
        ),
      ),
    );
  }

  public filterMerchantNamesSearch(name: string): Observable<string[]> {
    const filterValue = name.toLowerCase();
    return this.tabs$.pipe(
      map(
        (tabs) =>
          tabs &&
          tabs[this.currentTabIndex] &&
          Array.from(
            new Set(
              (tabs[this.currentTabIndex].merchantNames as string[]).filter((merchantName) =>
                merchantName.toLowerCase().includes(filterValue),
              ),
            ),
          ) || []
      ),
    );
  }

  public filterRewardsNamesSearch(name: string): Observable<string[]> {
    const filterValue = name.toLowerCase();
    return this.tabs$.pipe(
      map(
        (tabs) =>
          tabs &&
          tabs[this.currentTabIndex] &&
          tabs[this.currentTabIndex].rewardNames &&
          Array.from(
            new Set(
              (tabs[this.currentTabIndex].rewardNames as string[]).filter((rewardName) =>
                rewardName.toLowerCase().includes(filterValue),
              ),
            ),
          ) || []
      ),
    );
  }

  public onScroll(): void {
    if (!this.staticTabs) {
      return;
    }
    const stTab = this.staticTabs[this.currentTabIndex];
    if (!stTab || !stTab.rewardsList || stTab.completePagination) {
      return;
    }
    if (!stTab.rewardsList) {
      stTab.rewardsList = of([]);
    }
    stTab.currentPage = stTab.currentPage ? ++stTab.currentPage : 1;
    forkJoin(
      this.rewardsService.getRewards(
      stTab.currentPage,
      this.pageSize,
      undefined,
      stTab.rewardsType ? [stTab.rewardsType] : undefined)
      ,
      stTab.rewardsList
    ).subscribe((val) => {
      if (val[0].length < this.pageSize) {
        stTab.completePagination = true;
      }
      stTab.rewardsList = of([...val[1], ...val[0]]);
    });
  }

  public filterRewards(tab: ITabConfig): Observable<IReward[]> {
    const rewardsList = tab.rewardsList;
    if (!rewardsList) {
      throw new Error(
        'Rewards list is empty. Provide a list using [rewards] or [tabs]',
      );
    }

    return rewardsList.pipe(
      withLatestFrom(
        this.filteredRwdRewardNames,
        this.filteredRwdMerchantNames,
      ),
      map(
        ([rewards, rewardNames, merchantNames]: [
          IReward[],
          string[],
          string[],
        ]) =>  rewards.filter(
          (reward: IReward) =>
            rewardNames.includes(reward.name) ||
            (reward.merchantName &&
              merchantNames.includes(reward.merchantName)))
      )
    );
  }

  public rewardTappedHandler(reward: IReward): void {
    // forward the tapped event
    this.router.navigate([`/reward-detail/${reward.id}`]);
  }

  public tabChanged(event: MatTabChangeEvent): void {
    this.currentTabIndex = event.index;
  }
}
