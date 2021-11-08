import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ICampaignService, RewardsService } from '@perxtech/core';
import { IListItemModel } from '../../shared/models/list-item.model';
import { mapCampaignsToListItem, mapRewardsToListItem } from '../../shared/utilities/mapping.util';
import { forkJoin } from 'rxjs';
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
  private requestPageSize = 10;
  constructor(
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private campaignService: ICampaignService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(switchMap((params) => {
        if (params['search']) {
          this.searchValue = params['search'];
        }
        return forkJoin(
          this.rewardsService.searchRewards(this.searchValue, this.pageNumber, this.requestPageSize, params['tags']),
          this.campaignService.searchCampaigns(this.searchValue, this.pageNumber, this.requestPageSize)
          );
      }))
      .subscribe((
        [ rewards, campaigns ]
      ) => {
        this.isLoaded = false;
        this.searchResult = mapCampaignsToListItem(campaigns).concat(mapRewardsToListItem(rewards))
          .sort((firstReward,secondReward)=> {
          return new Date(secondReward.createdAt).getTime() - new Date(firstReward.createdAt).getTime();
        });
        this.isLoaded = true;
      });
  }
}
