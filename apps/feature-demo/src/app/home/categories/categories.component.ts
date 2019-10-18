import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../category.model';
import { categories as staticCategories} from '../../category.mock';
import { IReward, RewardsService, ITabConfig} from '@perx/core';
import { of, Subject} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit {
  public categories: ICategory[];

  public tabs$: Subject<ITabConfig[]> = new Subject<ITabConfig[]>();
  public tabs: ITabConfig[] = [];

  constructor(
    private rewardService: RewardsService,
    private router: Router) {
    this.categories = staticCategories;
  }

  public ngOnInit(): void {
    this.createTabsFromCategories();
    this.fetchDataForEachTab();
  }

  private createTabsFromCategories(): void {
    staticCategories.forEach(
      (category) => {
        this.tabs.push({
          filterKey: null,
          filterValue: null,
          tabName: category.name,
          rewardsList: null
        });
      }
    );
  }

  private fetchDataForEachTab(): void {
    this.tabs.forEach(
      (tab) => {
        const category = tab.tabName === 'All' ? null : [tab.tabName];
        this.rewardService.getAllRewards(null, category).subscribe(
          (rewards) => {
            tab.rewardsList = of(rewards);
            this.tabs$.next(this.tabs);
          }
        );
      }
    );
  }

  public rewardClickedHandler(reward: IReward): void {
    this.router.navigate(['/reward'], { queryParams: { id: reward.id } });
  }
}
