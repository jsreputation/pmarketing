import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService, ICatalog } from '@perx/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { CategorySelectComponent, BottomSheetClosedCallBack } from './category-select/category-select.component';
import { CategorySortComponent } from './category-sort/category-sort.component';
import { Observable, of } from 'rxjs';

export enum CategoryMode {
  reward = 'reward',
  catalog = 'catalog'
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, BottomSheetClosedCallBack {
  public rewards: Observable<IReward[]>;
  public selectedCategory: string;
  private currentMode: CategoryMode;

  constructor(
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    const categoryName = this.activeRoute.snapshot.queryParamMap.get('category');
    if (categoryName) {
          this.currentMode = CategoryMode.reward;
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
    this.bottomSheet.open(CategorySelectComponent, {
      data: this
    });
  }

  public selectSort(): void {
    this.bottomSheet.open(CategorySortComponent);
  }

  public categorySelectedCallback(updatedValue: string): void {
    if (this.currentMode === CategoryMode.reward) {
      this.selectedCategory = updatedValue;
      this.rewards = this.rewardsService.getAllRewards([this.selectedCategory]);
    }
  }

  public getCurrentSelectedCategory(): string {
    return this.selectedCategory ? this.selectedCategory : 'All';
  }
}
