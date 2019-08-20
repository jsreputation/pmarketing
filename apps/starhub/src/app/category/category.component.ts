import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { CategorySelectComponent } from './category-select/category-select.component';
import { CategorySortComponent } from './category-sort/category-sort.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public rewards: Observable<IReward[]>;

  constructor(
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private rewardsService: RewardsService
  ) {
  }

  public ngOnInit(): void {
    this.rewards = this.rewardsService.getAllRewards();
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
