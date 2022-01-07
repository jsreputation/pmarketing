import { Component, OnInit } from '@angular/core';
import { ICampaign, ICampaignService, IReward, RewardsService, Sort } from '@perxtech/core';
import { Params, Router } from '@angular/router';
import { CATALOG_CONFIGURATION } from '../../shared/constants/catalog-configuration.const';
import { IListItemModel } from '../../shared/models/list-item.model';
import { mapCampaignsToListItem, mapRewardsToListItem } from '../../shared/utilities/mapping.util';
import { combineLatest, forkJoin, iif, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'bdo-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
})
export class HomeComponent implements OnInit {
  catalogConfiguration = CATALOG_CONFIGURATION;
  featuredDeals: IListItemModel[] = [];

  nearByDeals: IListItemModel[] = [];
  whatsNewDeals: IListItemModel[] = [];
  popularDeals: IListItemModel[] = [];

  requestPageSize = 5;
  tag = {
    new: 'new',
    popular: 'popular',
    nearby: 'nearby',
    featured: 'featured',
  };


  private rad = 3000;
  public currentPosition: {
    lat: number;
    lng: number;
    // lat: 14.560446,
    // lng: 121.017646,
  };

  constructor(private rewardsService: RewardsService, private route: Router, private campaignService: ICampaignService) {
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.rewardsService
          .nearMe(this.rad, this.currentPosition.lat, this.currentPosition.lng, 1, this.requestPageSize)
          .subscribe((nearBy: IReward[]) => {
            this.nearByDeals = mapRewardsToListItem(nearBy).slice(0, 5);
          });
      });
    }

    forkJoin(
      [this.rewardsService
      .getRewards(1, this.requestPageSize, undefined, undefined, undefined, undefined, Sort.descending, 'begins_at'),
      this.campaignService.getCampaigns({ page: 1, size: this.requestPageSize, sortBy: 'begins_at'}).pipe(
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
      )
      ]).subscribe(([ rewards, campaigns])=>{
      let itemList = rewards.length > 0 ? mapRewardsToListItem(rewards) : [];
      itemList = campaigns.length > 0 ? itemList.concat(mapCampaignsToListItem(campaigns)): itemList;
      this.whatsNewDeals = itemList.sort((firstReward, secondReward)=>{
        return new Date(secondReward.createdAt).getTime() - new Date(firstReward.createdAt).getTime();
      }).slice(0, 5);
    });

    forkJoin(
      [this.rewardsService
      .getRewards(1, this.requestPageSize, [ this.tag.popular ], undefined, undefined, undefined, Sort.descending, 'begins_at'),
      this.campaignService.getCampaigns({ page: 1, size: this.requestPageSize, tags: [ this.tag.popular ], sortBy: 'begins_at'}).pipe(
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
      )
    ]).subscribe(([popularRewards, popularCampaigns])=>{
      let itemList = popularRewards.length > 0 ? mapRewardsToListItem(popularRewards) : [];
      itemList = popularCampaigns.length > 0 ? itemList.concat(mapCampaignsToListItem(popularCampaigns)): itemList;
      this.popularDeals = itemList.sort((firstReward, secondReward)=>{
        return new Date(secondReward.createdAt).getTime() - new Date(firstReward.createdAt).getTime();
      }).slice(0, 5);
    });
    
    forkJoin(
      [this.rewardsService
        .getRewards(1, this.requestPageSize, [ this.tag.featured ], undefined, undefined, undefined, Sort.descending, 'begins_at'),
      this.campaignService.getCampaigns({ page: 1, size: this.requestPageSize, tags: [ this.tag.featured ], sortBy: 'begins_at'}).pipe(
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
      )
    ]).subscribe(([featuredRewards, featuredCampaigns])=>{
      this.featuredDeals = mapRewardsToListItem(featuredRewards).concat(mapCampaignsToListItem(featuredCampaigns)).sort((firstReward, secondReward)=>{
        return new Date(secondReward.createdAt).getTime() - new Date(firstReward.createdAt).getTime();
      }).slice(0, 5);
    });
  }

  navigateTo(_selectedItem: IListItemModel) {
    if (_selectedItem.documentType === 'reward'){
      this.route.navigate([ `deal-welcome/${_selectedItem.id}` ]);
    } else if (_selectedItem.documentType === 'campaign'){
      this.route.navigate([ `treat-welcome/${_selectedItem.id}` ]);
    }
  }

  navigateToCatalog(type:string, tag:string) {
    const queryParams: Params = { type: type , tags: tag };
    this.route.navigate([ `catalog-page` ], { queryParams: queryParams });
  }

  navigateToSearchResult(tag: string) {
    const queryParams: Params = { tags: tag };
    this.route.navigate([ `result` ], { queryParams: queryParams });
  }

  navigateToNearByDeals() {
    this.route.navigate([ `nearby` ]);
  }
}
