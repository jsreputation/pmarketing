import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perxtech/core';
import { FilterService } from '../../shared/services/filter.service';

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
    private rewardsService: RewardsService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(switchMap((params) => {
        this.filterService.setParams((params));
        if (params['search']) {
          this.searchValue = params['search'];
          return this.rewardsService.searchRewards(params['search']);
        }
      }))
      .subscribe((rewards) => {
        this.searchResult = rewards;
      });
  }

  onLoadFilter() {
    this.filterService.showFilterDialog((value) => {
      console.log('apply filter here');
      console.log(value);
    });
  }
}
