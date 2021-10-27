import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ITrending, RewardsService } from '@perxtech/core';

@Component({
  selector: 'bdo-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent implements OnInit {
  public trendingList: string[] = [];
  public searchHistories: string[] = [];

  constructor(private rewardsService: RewardsService, private route: Router) {
  }

  public ngOnInit(): void {
    this.rewardsService.getTrending().subscribe((searchHistory: ITrending[]) => {
      this.trendingList = searchHistory.filter(trending => trending.value.trim()).map((item) => item.value);
    });
    this.rewardsService.getSearchHistory().subscribe((searchHistory: ISearchHistory[]) => {
      this.searchHistories = searchHistory.map(item => item.value);
    });
  }

  public onClick(trending: string): void {
    const queryParams: Params = { search: trending };
    this.route.navigate([ `result` ], { queryParams: queryParams });
  }
}
