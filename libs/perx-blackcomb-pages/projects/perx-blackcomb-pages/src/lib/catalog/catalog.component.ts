import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ICatalog, IReward, RewardsService, SortingMode, RssFeedsPages, FeedItem, FeedReaderService, SettingsService, IRssFeeds, IRssFeedsData } from '@perxtech/core';
import { map, scan, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

interface ISortMenuOption {
  action: 'Latest' | 'Ending' | 'AZ' | 'ZA';
  label: 'Most Recent' | 'Ending Soon' | 'Alphabet A - Z' | 'Alphabet Z - A'; // map to SortingMode enum
}
const REQ_PAGE_SIZE: number = 10;

@Component({
  selector: 'perx-blackcomb-pages-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  @ViewChild('contentScroll', { static: false })
  public contentScroll: ElementRef;
  public rewards$: Observable<IReward[]>;
  public rewardsLoaded: boolean = false;
  public rewardsEnded: boolean = false;
  public rewardsPageId: number = 1;
  public newsFeedItems: Observable<FeedItem[] | undefined>;

  public sortOptions: ISortMenuOption[] = [
    { action: 'Latest', label: 'Most Recent' },
    { action: 'Ending', label: 'Ending Soon' },
    { action: 'AZ', label: 'Alphabet A - Z' },
    { action: 'ZA', label: 'Alphabet Z - A' }
  ];

  public selectedCategory: string;
  public selectedSortingCriteria: SortingMode = SortingMode.endingSoon;
  public showToolbarTitle: boolean = false;

  private rewards: BehaviorSubject<IReward[]> = new BehaviorSubject<IReward[]>([]);

  private fetchRewards(): void {
    this.rewardsLoaded = false;
    const categories: string[] | null = this.selectedCategory === 'All' ? null : [this.selectedCategory];

    this.rewardsService.getRewards(this.rewardsPageId, REQ_PAGE_SIZE, null, categories)
      .subscribe((rewards: IReward[]) => {
        if (!rewards) {
          return;
        }
        this.rewards.next(rewards);
        this.rewardsLoaded = true;
        if (rewards.length < REQ_PAGE_SIZE) {
          this.rewardsEnded = true;
        }
      });
  }

  private initRewardsScan(): void {
    this.rewards$ = this.rewards.asObservable().pipe(
      scan((acc, curr) => [...acc, ...curr ? curr : []], [])
    );
  }

  constructor(
    private router: Router,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute,
    private feedService: FeedReaderService,
    private settingsService: SettingsService
  ) {
    this.initRewardsScan();
  }

  public ngOnInit(): void {
    const categoryName = this.activeRoute.snapshot.queryParamMap.get('catalogs');
    this.initRssItems();
    if (categoryName) {
      this.selectedCategory = categoryName;
      this.fetchRewards();
    } else {
      const catalogId = this.activeRoute.snapshot.queryParamMap.get('catalog');
      if (!catalogId) {
        return;
      }
      this.rewards$ = this.rewardsService.getCatalog(parseInt(catalogId, 10)).pipe(
        map((catalog: ICatalog) => {
          this.selectedCategory = catalog.name;
          return catalog.rewards || [];
        })
      );
    }
  }

  public goToReward(reward: IReward): void {
    this.router.navigate([`/reward-detail/${reward.id}`]);
  }

  public getCurrentSelectedOrder(): string {
    return this.selectedSortingCriteria;
  }

  public onScroll(): void {
    if (this.rewardsEnded) {
      return;
    }
    this.rewardsPageId++;
    this.fetchRewards();
  }

  public sortChoice({ action }: ISortMenuOption): void {
    this.selectedSortingCriteria = action as SortingMode;
  }

  private initRssItems(): void {
    this.newsFeedItems = this.settingsService.getRssFeeds().pipe(
      map((res: IRssFeeds) => res.data ? res.data.find(feed => feed.page === RssFeedsPages.CATALOGS) : undefined),
      switchMap((feedData: IRssFeedsData | undefined) => {
        if (!feedData || !feedData.url) {
          return of([] as FeedItem[]);
        }
        return this.feedService.getFromUrl(feedData.url);
      })
    );
  }

}
