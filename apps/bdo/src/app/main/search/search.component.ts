import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ITrending, RewardsService } from '@perxtech/core';

@Component({
  selector: 'bdo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  public trendingList: string[] = [];
  constructor(private rewardsService: RewardsService, private route:Router) { }

  ngOnInit(): void {
    this.rewardsService
      .getTrending()
      .subscribe((searchHistory: ITrending[]) => {
        this.trendingList = searchHistory.map((item) => item.value);
      });
  }

  onClick(trending:string) {
    const queryParams: Params = { search: trending };
    this.route.navigate([`result`], { queryParams:queryParams });
  }
}
