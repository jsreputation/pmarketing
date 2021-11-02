import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RewardsService } from '@perxtech/core';
import { IListItemModel } from '../../shared/models/list-item.model';
import { mapRewardsToListItem } from '../../shared/utilities/mapping.util';
@Component({
  selector: 'bdo-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  public searchValue = '';
  public searchResult: IListItemModel[] = [];
  public isLoaded = true;
  constructor(
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(switchMap((params) => {
        if (params['search']) {
          this.searchValue = params['search'];
        }
        return this.rewardsService.searchRewards(this.searchValue, params['tags']);
      }))
      .subscribe((rewards) => {
        this.searchResult = mapRewardsToListItem(rewards);
        this.isLoaded = false;
      });
  }
}
