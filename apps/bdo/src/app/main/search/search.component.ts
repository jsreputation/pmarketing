import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { IConfig, ITrending, ISearchHistory, RewardsService, ConfigService } from '@perxtech/core';
import { FilterDialogService } from '../../shared/services/filter.dialog.service';
interface IBDOConfig {
  showSearchHistory: boolean;
}

@Component({
  selector: 'bdo-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent implements OnInit {
  public trendingList: string[] = [];
  public searchHistories: string[] = [];
  public showHistory = false;

  constructor(
    private rewardsService: RewardsService,
    private configService: ConfigService,
    private filterDialogService: FilterDialogService,
    private route: Router) {
  }

  public ngOnInit(): void {
    this.filterDialogService.closeFilter();
    this.configService.readAppConfig<IBDOConfig>().subscribe((config: IConfig<IBDOConfig>) => {
      this.showHistory = config.custom!.showSearchHistory;
    });


    this.rewardsService.getTrending().subscribe((searchHistory: ITrending[]) => {
      this.trendingList = searchHistory.filter(trending => trending.value.trim()).map((item) => unescape(item.value));
    });
    this.rewardsService.getSearchHistory().subscribe((searchHistory: ISearchHistory[]) => {
      this.searchHistories = searchHistory.map(item => item.value);
    });
  }

  public onClick(searchString: string): void {
    const queryParams: Params = { search: searchString };
    this.route.navigate([ `result` ], { queryParams: queryParams });
  }
}
