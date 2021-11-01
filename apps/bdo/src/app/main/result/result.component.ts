import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RewardsService } from '@perxtech/core';
import { IListItemModel } from '../../shared/models/list-item.model';

@Component({
  selector: 'bdo-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  public searchValue = '';
  public searchResult: IListItemModel[] = [];
  public isLoaded = false;
  private pageNumber = 1;
  private requestPageSize = 100;
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
        return this.rewardsService.searchRewards(this.searchValue, this.pageNumber, this.requestPageSize, params['tags']);
      }))
      .subscribe((rewards) => {
        this.isLoaded = false;
        this.searchResult = rewards.map(item => {
          return {
            id: item.id,
            thumbnail: item.rewardThumbnail,
            name: item.name,
            categoryTags: item.categoryTags,
            createdAt: item.validFrom,
            description: item.description
          } as IListItemModel;
        })
        .sort((firstReward,secondReward)=> {
          return new Date(secondReward.createdAt).getTime() - new Date(firstReward.createdAt).getTime();
        });
        this.isLoaded = true;
      });
  }
}
