import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  public catalog: string;

  constructor(
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute

  ) {}

  public ngOnInit(): void {
    this.rewards = this.rewardsService.getAllRewards();
    this.activeRoute.queryParams
      .subscribe((params: Params) => {
        if (params.catalog) {
          this.catalog = params.catalog;
        } else if (params.category) {
          this.catalog = params.category;
        }
      });
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
