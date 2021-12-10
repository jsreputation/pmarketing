import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ICampaign, ICampaignService, RewardsService } from '@perxtech/core';
import { IListItemModel } from '../../shared/models/list-item.model';
import { mapCampaignsToListItem, mapRewardsToListItem } from '../../shared/utilities/mapping.util';
import { combineLatest, forkJoin, iif, of } from 'rxjs';
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
          this.campaignService.searchCampaigns(this.searchValue, this.pageNumber, this.requestPageSize).pipe(
            // for each campaign, get detailed version
            mergeMap((campaigns: ICampaign[]) =>
              iif(() => campaigns.length > 0,
                combineLatest(
                  ...campaigns.map((campaign) =>
                    this.campaignService
                      .getCampaign(campaign.id)
                      .pipe(catchError(() => of(void 0)))
                  )
                ),
                of([])
              )
          )
        ));
      }))
      .subscribe((
        [ rewards, campaigns ]
      ) => {
        this.isLoaded = false;
        let itemList = rewards.length > 0 ? mapRewardsToListItem(rewards) : [];
        itemList = campaigns.length > 0 ? itemList.concat(mapCampaignsToListItem(campaigns)): itemList;
        this.searchResult = itemList.sort((firstReward,secondReward)=> {
          return secondReward.score - firstReward.score;
        });
        this.isLoaded = true;
      });
  }
}
