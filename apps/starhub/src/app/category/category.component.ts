import { Component } from '@angular/core';
import { IReward } from '@perx/core';
import { rewards } from '../rewards.mock';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { CategorySelectComponent } from './category-select/category-select.component';
import { CategorySortComponent } from './category-sort/category-sort.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  public rewards: IReward[];

  constructor(
    private router: Router,
    private bottomSheet: MatBottomSheet
  ) {
    this.rewards = rewards;
  }

  public selected(reward: IReward): void {
    this.router.navigate(['/reward'], { queryParams: { id: reward.id } });
  }

  public selectCategory(): void {
    this.bottomSheet.open(CategorySelectComponent);
  }

  public selectSort(): void {
    this.bottomSheet.open(CategorySortComponent);
  }
}
