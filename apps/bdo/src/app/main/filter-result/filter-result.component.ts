import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perxtech/core';

@Component({
  selector: 'bdo-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss'],
})
export class FilterResultComponent implements OnInit {
  public searchValue = '';
  public searchResult: IReward[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(switchMap((param) => {
        if(param.hasOwnProperty("search_by") && param.search_by === 'string'){
          this.searchValue = param.text;
          return this.rewardsService.searchRewards(param.text);
        }
      }))
      .subscribe((rewards) => {
        this.searchResult = rewards;
      });
  }
}
