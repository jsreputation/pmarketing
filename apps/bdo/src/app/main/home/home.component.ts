import { Component, OnInit } from '@angular/core';
import { FeaturedDeals } from '../../models/featured-deals.models';
import { ICampaignService, IReward, RewardsService } from '@perxtech/core';
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

  requestPageSize = 10;
  requestPageSizeForWhatsNew = 5;
  tag = {
    new: 'new',
    popular: 'popular',
    nearby: 'nearby',
    featured: 'featured',
  };


  private rad = 10000;
  currentPosition = {
    lat: 14.560446,
    lng: 121.017646,
  };

  constructor(private rewardsService: RewardsService, private route: Router, private campaignService: ICampaignService) {
  }

  ngOnInit(): void {
    this.rewardsService
      .nearMe(this.rad, this.currentPosition.lat, this.currentPosition.lng, 1, this.requestPageSize)
      .subscribe((nearBy: IReward[]) => {
        this.nearByDeals = mapRewardsToListItem(nearBy);
      });

    forkJoin(
      [this.rewardsService
      .getRewards(1, this.requestPageSizeForWhatsNew, undefined, undefined, undefined, undefined, undefined),
      this.campaignService.getCampaigns({ page: 1, size: this.requestPageSizeForWhatsNew})
    ]).subscribe(([rewards, campaigns])=>{
      this.whatsNewDeals = mapRewardsToListItem(rewards).concat(mapCampaignsToListItem(campaigns)).sort((firstReward, secondReward)=>{
        return new Date(secondReward.createdAt).getTime() - new Date(firstReward.createdAt).getTime();
      })
    });

    forkJoin(
      [this.rewardsService
      .getRewards(1, this.requestPageSize, [ this.tag.popular ]),
      this.campaignService.getCampaigns({ page: 1, size: this.requestPageSize, tags: [ this.tag.popular ]})
    ]).subscribe(([popularRewards, popularCampaigns])=>{
      this.popularDeals = mapRewardsToListItem(popularRewards).concat(mapCampaignsToListItem(popularCampaigns));
    });
    
    this.rewardsService
      .getRewards(1, this.requestPageSize, [ this.tag.featured ])
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
