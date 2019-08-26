import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService, ICatalog } from '@perx/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { CategorySelectComponent, CategoryBottomSheetClosedCallBack } from './category-select/category-select.component';
import { CategorySortComponent, SortBottomSheetClosedCallBack } from './category-sort/category-sort.component';
import { Observable, of } from 'rxjs';
import { CategoryMode, SortingMode } from './category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, CategoryBottomSheetClosedCallBack, SortBottomSheetClosedCallBack {

  private currentMode: CategoryMode;
  public rewards: Observable<IReward[]>;

  public selectedCategory: string;
  public selectedSortingCraeteria: SortingMode = SortingMode.latest;

  constructor(
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const categoryName = this.activeRoute.snapshot.queryParamMap.get('category');
    if (categoryName) {
          this.currentMode = CategoryMode.reward;
          this.selectedCategory = categoryName;
          this.rewards = this.rewardsService.getAllRewards([this.selectedCategory]);
    } else {
        this.currentMode = CategoryMode.catalog;
        const catalogId = +this.activeRoute.snapshot.queryParamMap.get('catalog');
        this.rewardsService.getCatalog(catalogId)
          .subscribe((catalog: ICatalog) => {
            this.selectedCategory = catalog.name;
            this.rewards = of(catalog.rewards);
          });
    }
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
    if (this.currentMode === CategoryMode.reward) {
      this.selectedCategory = updatedValue;
      this.rewards = this.rewardsService.getAllRewards([this.selectedCategory]);
    }
  }

  public getCurrentSelectedCategory(): string {
    return this.selectedCategory ? this.selectedCategory : 'All';
  }

  // SortBottomSheetClosedCallBack methods

  public sortOrderSelectedCallback(updatedValue: SortingMode): void {
    this.selectedSortingCraeteria = updatedValue;
  }

  public getCurrentSelectedOrder(): SortingMode {
    return this.selectedSortingCraeteria;
  }
}
