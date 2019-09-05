import { Component, OnInit, NgZone } from '@angular/core';
import { IReward, RewardsService, ICatalog } from '@perx/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { CategorySelectComponent, CategoryBottomSheetClosedCallBack } from './category-select/category-select.component';
import { CategorySortComponent, SortBottomSheetClosedCallBack } from './category-sort/category-sort.component';
import { Observable } from 'rxjs';
import { SortingMode } from './category.model';
import { map } from 'rxjs/operators';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, CategoryBottomSheetClosedCallBack, SortBottomSheetClosedCallBack {

  public rewards: Observable<IReward[]>;

  public selectedCategory: string;
  public selectedSortingCraeteria: SortingMode = SortingMode.latest;
  public showToolbarTitle: boolean = false;

  constructor(
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute,
    private scrollDispatcher: ScrollDispatcher,
    private zone: NgZone
  ) { }

  public ngOnInit(): void {
    const categoryName = this.activeRoute.snapshot.queryParamMap.get('category');
    if (categoryName) {
          this.selectedCategory = categoryName;
          this.fetchRewards();
    } else {
        const catalogId = +this.activeRoute.snapshot.queryParamMap.get('catalog');
        this.rewards = this.rewardsService.getCatalog(catalogId).pipe(
          map((catalog: ICatalog) => {
            this.selectedCategory = catalog.name;
            return catalog.rewards;
          })
        );
    }
    this.scrollDispatcher.scrolled().subscribe((cdkScrollable: CdkScrollable) => {
      this.checkScrolledPosition(cdkScrollable.getElementRef().nativeElement.scrollTop);
    });
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

  private fetchRewards(): void {
    if (this.selectedCategory === 'All') {
      this.rewards = this.rewardsService.getAllRewards();
      return;
    }

    this.rewards = this.rewardsService.getAllRewards(null, [this.selectedCategory]);
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
    this.fetchRewards();
  }

  public getCurrentSelectedCategory(): string {
    return this.selectedCategory ? this.selectedCategory : 'All';
  }

  public getMacaron(validDateFrom: string, validDateTo: string): string {
    const currentDate = new Date().getTime();
    const validTo = new Date(validDateTo);
    const validToTimeDifference = validTo.valueOf() - currentDate.valueOf();
    const validToDifferenceInHours = Math.abs(validToTimeDifference / 1000 / 60 / 60);

    const validFrom = new Date(validDateFrom);
    const validDateFromTimeDifference = validFrom.valueOf() - currentDate.valueOf();
    const validDateFromDifferenceInHours = Math.abs(validDateFromTimeDifference / 1000 / 60 / 60);

    let macaronText: string = '';
    if (validToDifferenceInHours <= 36) {
      macaronText = 'expiring';
    } else if (validDateFromDifferenceInHours <= 72) {
      macaronText = 'just-added';
    }
    return macaronText;
  }

  // SortBottomSheetClosedCallBack methods

  public sortOrderSelectedCallback(updatedValue: SortingMode): void {
    this.selectedSortingCraeteria = updatedValue;
  }

  public getCurrentSelectedOrder(): SortingMode {
    return this.selectedSortingCraeteria;
  }
}
