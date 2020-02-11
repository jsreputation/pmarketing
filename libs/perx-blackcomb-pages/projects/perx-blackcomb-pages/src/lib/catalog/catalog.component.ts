import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICatalog, IReward, RewardsService} from '@perx/core';
import {map, scan} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

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
  private rewards: BehaviorSubject<IReward[]> = new BehaviorSubject<IReward[]>([]);

  public selectedCategory: string;
  public selectedSortingCriteria: string = 'Ending Soon';
  public showToolbarTitle: boolean = false;

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
    private matDialog: MatDialog
  ) {
    this.initRewardsScan();
  }

  public ngOnInit(): void {
    const categoryName = this.activeRoute.snapshot.queryParamMap.get('catalogs');
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

  public selectSort(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    // const dialogRef = this.matDialog.open( P, {
    //   data: {
    //     trigger: target,
    //     ...this
    //   }
    // })
    console.log('fuck', target);
  }

  public goToReward(reward: IReward): void {
    this.router.navigate([`/reward-detail/${reward.id}`]);
  }

  public getCurrentSelectedOrder(): string  {
    return this.selectedSortingCriteria;
  }

  public onScroll(): void {
    if (this.rewardsEnded) {
      return;
    }
    this.rewardsPageId++;
    this.fetchRewards();
  }

}
