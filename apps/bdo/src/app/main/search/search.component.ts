import { Component, OnInit } from '@angular/core';
import { ITrending, RewardsService } from '@perxtech/core';

@Component({
  selector: 'bdo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  public trendingList: string[] = [];
  constructor(private rewardsService: RewardsService) { }

  ngOnInit(): void {
    this.rewardsService
      .getTrending()
      .subscribe((searchHistory: ITrending[]) => {
        this.trendingList = searchHistory.filter(trending=>trending.value.trim()).map((item) => item.value);
      });
  }
}
