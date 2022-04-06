import { catchError, mergeMap, } from 'rxjs/operators';
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
  public tagsParam = '';
  public isRewardPaginationCompleted = false;
  public isCampaignPaginationCompleted = false;
 
  constructor(
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private campaignService: ICampaignService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams
      .subscribe((params) => {
        if (params['search']) {
          this.searchValue = params['search'];
        }
        this.tagsParam = params['tags'];
        this.isLoaded = this.isRewardPaginationCompleted = this.isCampaignPaginationCompleted = false;
        this.pageNumber = 1;
        this.searchResult = [];
        this.getSearchItems();
      });       
  }

  public getSearchItems(): void {
    forkJoin(
      iif(() => !this.isRewardPaginationCompleted, 
        this.rewardsService.searchRewards(this.searchValue, this.pageNumber, this.requestPageSize, this.tagsParam ), of([])),
        iif(() => !this.isCampaignPaginationCompleted, 
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
      ), of([]))
    ).subscribe(([ rewards, campaigns ]) => {
        this.isLoaded = false;
        this.pageNumber++;
        this.isRewardPaginationCompleted = rewards?.length < this.requestPageSize;
        this.isCampaignPaginationCompleted = campaigns?.length < this.requestPageSize;
        let itemList = rewards.length > 0 ? mapRewardsToListItem(rewards) : [];
        itemList = campaigns.length > 0 ? itemList.concat(mapCampaignsToListItem(campaigns)): itemList;
        const sortedList = itemList.sort((firstReward,secondReward)=> {
          return secondReward.score - firstReward.score;
        });
        this.searchResult.push(...sortedList);
        this.isLoaded = true;
    });
  }

  public onScroll(): void {
    if (this.isRewardPaginationCompleted && this.isCampaignPaginationCompleted) {
      return;
    } 
    this.getSearchItems();
  }
}
