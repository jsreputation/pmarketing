import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perxtech/core';
import { FilterService } from '../../shared/services/filter.service';

@Component({
  selector: 'bdo-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
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
        }
        return this.rewardsService.searchRewards(this.searchValue, params['tags']);
      }))
      .subscribe((rewards) => {
        this.searchResult = rewards;
      });
  }
}
