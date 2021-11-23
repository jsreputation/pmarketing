import { Component, OnInit } from '@angular/core';
import { ICampaignService, IReward, RewardsService, Sort } from '@perxtech/core';
import { Params, Router } from '@angular/router';
import { CATALOG_CONFIGURATION } from '../../shared/constants/catalog-configuration.const';
import { HOME_LIST_CATEGORY_CONFIGURATIONS } from '../../shared/constants/home-category-configuration.const';
import { IListItemModel } from '../../shared/models/list-item.model';
import { mapCampaignsToListItem, mapRewardsToListItem } from '../../shared/utilities/mapping.util';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'bdo-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
})
export class HomeComponent implements OnInit {
  categories = HOME_LIST_CATEGORY_CONFIGURATIONS;
  catalogConfiguration = CATALOG_CONFIGURATION;
  featuredDeals: IReward[] = [];

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


  private rad = 5000;
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
      this.campaignService.getCampaigns({ page: 1, size: this.requestPageSize, sortBy: 'begins_at'})
    ]).subscribe(([rewards, campaigns])=>{
      this.whatsNewDeals = mapRewardsToListItem(rewards).concat(mapCampaignsToListItem(campaigns)).sort((firstReward, secondReward)=>{
        return new Date(secondReward.createdAt).getTime() - new Date(firstReward.createdAt).getTime();
      }).slice(0, 5);
    });

    forkJoin(
      [this.rewardsService
      .getRewards(1, this.requestPageSize, [ this.tag.popular ], undefined, undefined, undefined, Sort.descending, 'begins_at'),
      this.campaignService.getCampaigns({ page: 1, size: this.requestPageSize, tags: [ this.tag.popular ], sortBy: 'begins_at'})
    ]).subscribe(([popularRewards, popularCampaigns])=>{
      this.popularDeals = mapRewardsToListItem(popularRewards).concat(mapCampaignsToListItem(popularCampaigns)).sort((firstReward, secondReward)=>{
        return new Date(secondReward.createdAt).getTime() - new Date(firstReward.createdAt).getTime();
      }).slice(0, 5);
    });
    
    this.rewardsService
      .getRewards(1, this.requestPageSize, [ this.tag.featured ], undefined, undefined, undefined, Sort.descending, 'begins_at')
      .subscribe((featuredDeals: IReward[]) => {
        this.featuredDeals = featuredDeals;
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
