import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';

import {
  ActivatedRoute,
  Params,
  Router,
} from '@angular/router';
import { MatBottomSheet } from '@angular/material';

import {
  map,
  switchMap,
  tap
} from 'rxjs/operators';

import {
  ConfigService,
  ICatalog,
  IConfig,
  IReward,
  RewardsService,
  Sort,
} from '@perxtech/core';

import {
  CategoryBottomSheetClosedCallBack,
  CategorySelectComponent,
} from './category-select/category-select.component';
import {
  CategorySortComponent,
  SortBottomSheetClosedCallBack,
} from './category-sort/category-sort.component';
import { SortingMode } from './category.model';

import {
  IMacaron,
  MacaronService,
} from '../services/macaron.service';
import {
  AnalyticsService,
  PageType,
} from '../analytics.service';
import { trigger } from '@angular/animations';
import {
  fadeIn,
  fadeOut
} from '../utils/fade-animations';
import { IStarhubConfig } from '../home/home/home.component';
import { oc } from 'ts-optchain';
import {
  EMPTY,
  iif,
  of
} from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

const REQ_PAGE_SIZE: number = 10;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn())
  ]
})
export class CategoryComponent implements OnInit, CategoryBottomSheetClosedCallBack, SortBottomSheetClosedCallBack, AfterViewInit {
  @ViewChild('contentScroll', { static: false })
  public contentScroll: ElementRef;
  public rewardsList: IReward[] = [];
  public rewardsEnded: boolean = false;
  public rewardsPageId: number = 1;
  public ghostRewards: any[] = new Array(3); // 3 is also enough for above the fold height

  public selectedCategory: string;
  public selectedSortingCraeteria: SortingMode = SortingMode.ending_soon;
  public showToolbarTitle: boolean = false;

  public uxcr: boolean = false;

  private fetchRewards(): Observable<IReward[]> {
    const categories: string[] | null = this.selectedCategory === 'All' ? null : [this.selectedCategory];
    const orderBy = this.selectedSortingCraeteria === SortingMode.latest ? 'begins_at' : 'ends_at';

    return this.rewardsService.getRewards(
      this.rewardsPageId, REQ_PAGE_SIZE,
      null,
      categories,
      undefined,
      undefined,
      Sort.ascending,
      orderBy
    ).pipe(
      map((rewards: IReward[]) => {
        if (! rewards) {
          return [];
        }
        // merge newly fetched rewards with the old list
        this.rewardsList = [ ...this.rewardsList, ...rewards ];
        if (rewards.length < REQ_PAGE_SIZE) {
          this.rewardsEnded = true;
          this.ghostRewards = [];
        }
        return this.rewardsList;
      })
    );
  }

  constructor(
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute,
    private zone: NgZone,
    private macaronService: MacaronService,
    private analytics: AnalyticsService,
    private renderer: Renderer2,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    // const categoryName = this.activeRoute.snapshot.queryParamMap.get('category');
    // if (categoryName) {
    //   this.selectedCategory = categoryName;
    //   const pageName: string = `rewards:discover:${categoryName.toLowerCase()}`;
    //   this.analytics.addEvent({
    //     pageName,
    //     pageType: PageType.sectionLanding,
    //     siteSectionLevel2: 'rewards:discover',
    //     siteSectionLevel3: pageName
    //   });
    //   this.fetchRewards();
    // } else {
    //   const catalogId = this.activeRoute.snapshot.queryParamMap.get('catalog');
    //   if (!catalogId) {
    //     return;
    //   }
    //   this.rewardsService.getCatalog(parseInt(catalogId, 10)).pipe(
    //     map((catalog: ICatalog) => {
    //       this.selectedCategory = catalog.name;
    //       this.analytics.addEvent({
    //         pageName: `rewards:discover:${catalog.name}`,
    //         pageType: PageType.sectionLanding,
    //         siteSectionLevel2: 'rewards:discover',
    //         siteSectionLevel3: `rewards:discover:${catalog.name}`
    //       });
    //       return catalog.rewards || [];
    //     }),
    //     finalize(() => this.ghostRewards = [])
    //   ).subscribe(rewards => this.rewardsList = rewards);
    // }

    this.configService.readAppConfig<IStarhubConfig>().pipe(
      map((config: IConfig<IStarhubConfig>) => {
        this.uxcr = oc(config).custom.UXCR(false);
      }),
      switchMap(() =>
        iif(() => !! this.activeRoute.snapshot.queryParamMap.get('category'),
          this.initCategory(),
          this.initCatalog()
        ))
    ).subscribe(
      (rewardsList: IReward[]) => {
        this.rewardsList = rewardsList;
        this.ghostRewards = [];
      },
      () => {
        this.ghostRewards = [];
      });
  }

  private initCatalog(): Observable<any> {
    return this.activeRoute.queryParams
      .pipe(
        switchMap(
          (params: Params) => iif(
            () => params.catalog && params.catalog !== '',
            this.rewardsService.getCatalog(parseInt(params.catalog, 10)),
            of(EMPTY) // do nothing and terminate observable
            )
        ),
        map((catalog: ICatalog) => {
          this.selectedCategory = catalog.name;
          this.analytics.addEvent({
            pageName: `rewards:discover:${catalog.name}`,
            pageType: PageType.sectionLanding,
            siteSectionLevel2: 'rewards:discover',
            siteSectionLevel3: `rewards:discover:${catalog.name}`
          });
          return catalog.rewards || [];
        })
      );
  }

  private initCategory(): Observable<any> {
    return this.activeRoute.queryParams
      .pipe(
        tap((params: Params) => {
          if (params.category && params.category !== '') {
            const categoryName = params.category;
            this.selectedCategory = categoryName;
            const pageName: string = `rewards:discover:${categoryName.toLowerCase()}`;
            this.analytics.addEvent({
              pageName,
              pageType: PageType.sectionLanding,
              siteSectionLevel2: 'rewards:discover',
              siteSectionLevel3: pageName
            });
          }
        }),
        switchMap((params: Params) => iif(() => (params.category && params.category !== ''), this.fetchRewards(), of([])))
      );
  }

  private checkScrolledPosition(scrollValue: number): void {
    this.zone.run(() => {
      if (scrollValue >= 50) {
        this.showToolbarTitle = true;
      } else {
        this.showToolbarTitle = false;
      }
    });
  }

  public selected(reward: IReward): void {
    this.router.navigate(['/reward'], { queryParams: { id: reward.id } });
  }

  public selectCategory(): void {
    this.bottomSheet.open(CategorySelectComponent, { data: this });
  }

  public selectSort(): void {
    this.bottomSheet.open(CategorySortComponent, { data: this });
  }

  // CategoryBottomSheetClosedCallBack methods

  public categorySelectedCallback(updatedValue: string): void {
    this.selectedCategory = updatedValue;
    // reset rewardsPageId, rewardsEnded and rewardsList before changing category
    this.rewardsPageId = 1;
    this.rewardsList = [];
    this.rewardsEnded = false;
    this.ghostRewards = new Array(3);
    this.fetchRewards().subscribe(() => {
    }, () => {
      this.ghostRewards = [];
    });
  }

  public getCurrentSelectedCategory(): string {
    return this.selectedCategory ? this.selectedCategory : 'All';
  }

  public getMacaron(reward: IReward): IMacaron | null {
    return this.macaronService.getMacaron(reward);
  }

  // SortBottomSheetClosedCallBack methods
  public sortOrderSelectedCallback(updatedValue: SortingMode): void {
    this.selectedSortingCraeteria = updatedValue;
    // reset rewardsPageId, rewardsEnded and rewardsList before changing sort
    this.rewardsPageId = 1;
    this.rewardsList = [];
    this.rewardsEnded = false;
    this.ghostRewards = new Array(3);
    this.fetchRewards().subscribe(() => {
    }, () => {
      this.ghostRewards = [];
    });
  }

  public getCurrentSelectedOrder(): SortingMode {
    return this.selectedSortingCraeteria;
  }

  public onScroll(): void {
    if (this.rewardsEnded) {
      return;
    }

    this.rewardsPageId++;
    this.fetchRewards().subscribe(() => {
    }, () => {
      this.ghostRewards = [];
    });
  }

  public ngAfterViewInit(): void {
    if (this.contentScroll && this.contentScroll.nativeElement) {
      this.renderer.listen(this.contentScroll.nativeElement, 'scroll', () => {
        this.checkScrolledPosition(this.contentScroll.nativeElement.scrollTop);
      });
    }
  }
}
