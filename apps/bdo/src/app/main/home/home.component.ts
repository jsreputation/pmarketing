import { Component, OnInit } from '@angular/core';
import { ICampaignService, IReward, RewardsService, Sort, ICatalog, ICatalogItem, ICampaign, IConfig, ConfigService } from '@perxtech/core';
import { Params, Router } from '@angular/router';
import { CATALOG_CONFIGURATION } from '../../shared/constants/catalog-configuration.const';
import { IListItemModel } from '../../shared/models/list-item.model';
import { mapRewardsToListItem, mapRewardToListItem, mapCampaignToListItem, mapCampaignsToListItem } from '../../shared/utilities/mapping.util';
import { forkJoin, iif, of, combineLatest } from 'rxjs';
import { catchError, tap, switchMap, mergeMap } from 'rxjs/operators';

const ORDERED_CATALOG_NAME = 'bdo deals';

interface IBDOConfig {
  showOrderedCatalogItems: boolean;
}
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
  catalogId: number;
  showOrderedCatalogItems = false;

  constructor(private rewardsService: RewardsService, private route: Router, private campaignService: ICampaignService, private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.readAppConfig<IBDOConfig>().subscribe((config: IConfig<IBDOConfig>) => {
      this.showOrderedCatalogItems = config.custom && config.custom.showOrderedCatalogItems ? config.custom.showOrderedCatalogItems : false;
    });

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

    this.rewardsService.getCatalogs(1, this.requestPageSize).subscribe((catalogs) => {
      this.catalogId = catalogs?.find((catalog: ICatalog) => catalog.name.toLowerCase() === ORDERED_CATALOG_NAME)?.id;
      this.loadDeals();
    });

  }

  loadDeals(): void {

    if (this.showOrderedCatalogItems) {

    let whatsNewRewardIds, whatsNewCampaignIds, whatsNewItems;
    this.rewardsService.getCatalogItems(this.catalogId, 1, this.requestPageSize, 'en', 
                                        undefined, undefined, Sort.descending,'begins_at')
    .pipe(      
      tap((items: ICatalogItem[]) => {
        whatsNewItems = items;
        whatsNewRewardIds = items?.filter(item => item.itemType === 'Reward::Campaign')?.map(item => item.itemId);
        whatsNewCampaignIds  = items?.filter(item => item.itemType === 'Campaign')?.map(item => item.itemId);
      }),
      switchMap(() => 
        forkJoin([
          iif(() => whatsNewRewardIds && whatsNewRewardIds.length > 0 , this.rewardsService.getRewardsById(whatsNewRewardIds, whatsNewRewardIds.length)
          .pipe(catchError(() => of([]))), of([])),
          iif(() => whatsNewCampaignIds && whatsNewCampaignIds.length > 0, this.campaignService.getCampaignsById(whatsNewCampaignIds, whatsNewCampaignIds.length)
          .pipe(catchError(() => of([]))), of([]))
        ])
      ))
    .subscribe(([ rewards, campaigns])=>{
      const listItems =[];
      whatsNewItems?.forEach((item: ICatalogItem) => {
        if (item.itemType === 'Reward::Campaign') {
          const reward = rewards?.find(reward => reward.id === item.itemId);
          if(reward) {
            listItems.push(mapRewardToListItem(reward));
          }          
        } else if (item.itemType === 'Campaign'){
          const campaign = campaigns?.find(campaign => campaign.id === item.itemId);
          if(campaign) {
            listItems.push(mapCampaignToListItem(campaign));
          }        
        }
      });
      this.whatsNewDeals = listItems;
  });

    let popularRewardIds, popularCampaignIds, popularItems;
    this.rewardsService.getCatalogItems(this.catalogId, 1, this.requestPageSize, 'en', undefined,
                                        [ this.tag.popular ], undefined, undefined)
    .pipe(      
      tap((items: ICatalogItem[]) => {
        popularItems = items;
        popularRewardIds = items?.filter(item => item.itemType === 'Reward::Campaign')?.map(item => item.itemId);
        popularCampaignIds  = items?.filter(item => item.itemType === 'Campaign')?.map(item => item.itemId);
      }),
      switchMap(() => 
        forkJoin([
          iif(() => popularRewardIds && popularRewardIds.length > 0 , this.rewardsService.getRewardsById(popularRewardIds, popularRewardIds.length)
          .pipe(catchError(() => of([]))), of([])),
          iif(() => popularCampaignIds && popularCampaignIds.length > 0, this.campaignService.getCampaignsById(popularCampaignIds, popularCampaignIds.length)
          .pipe(catchError(() => of([]))), of([]))
        ])
      ))
    .subscribe(([popularRewards, popularCampaigns]) => {
      const listItems =[];
      popularItems?.forEach((item: ICatalogItem) => {
        if (item.itemType === 'Reward::Campaign') {
          const reward = popularRewards?.find(reward => reward.id === item.itemId);
          if(reward) {
            listItems.push(mapRewardToListItem(reward));
          }          
        } else if (item.itemType === 'Campaign') {
          const campaign = popularCampaigns?.find(campaign => campaign.id === item.itemId);
          if(campaign) {
            listItems.push(mapCampaignToListItem(campaign));
          }        
        }
      });
      this.popularDeals = listItems;
    });

    let featuredRewardIds, featuredCampaignIds, featuredItems;
    this.rewardsService.getCatalogItems(this.catalogId, 1, this.requestPageSize, 'en', undefined, 
                                        [ this.tag.featured ], undefined, undefined)
    .pipe(      
      tap((items: ICatalogItem[]) => {
        featuredItems = items;
        featuredRewardIds = items?.filter(item => item.itemType === 'Reward::Campaign')?.map(item => item.itemId);
        featuredCampaignIds  = items?.filter(item => item.itemType === 'Campaign')?.map(item => item.itemId);
      }),
      switchMap(() => 
        forkJoin([
          iif(() => featuredRewardIds && featuredRewardIds.length > 0 , this.rewardsService.getRewardsById(featuredRewardIds, featuredRewardIds.length)
          .pipe(catchError(() => of([]))), of([])),
          iif(() => featuredCampaignIds && featuredCampaignIds.length > 0, this.campaignService.getCampaignsById(featuredCampaignIds, featuredCampaignIds.length)
          .pipe(catchError(() => of([]))), of([]))
        ])
      ))
    .subscribe(([featuredRewards, featuredCampaigns])=>{
      const listItems =[];
      featuredItems?.forEach((item: ICatalogItem) => {
        if (item.itemType === 'Reward::Campaign') {
          const reward = featuredRewards?.find(reward => reward.id === item.itemId);
          if(reward) {
            listItems.push(mapRewardToListItem(reward));
          }          
        } else if (item.itemType === 'Campaign') {
          const campaign = featuredCampaigns?.find(campaign => campaign.id === item.itemId);
          if(campaign) {
            listItems.push(mapCampaignToListItem(campaign));
          }        
        }
      });
      this.featuredDeals = listItems;
    });
    } else {

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
