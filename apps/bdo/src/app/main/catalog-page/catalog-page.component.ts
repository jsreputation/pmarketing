import { IListItemModel } from '../../shared/models/list-item.model';
import { catchError, switchMap, takeUntil, tap, filter, mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICampaignService, RewardsService, Sort, ICatalogItem, ICatalog, ICampaign, IConfig, ConfigService } from '@perxtech/core';
import { FilterService } from '../../shared/services/filter.service';
import { forkJoin, combineLatest, of, iif } from 'rxjs';
import { IFilterModel } from '../../shared/models/filter.model';
import { FILTER_DATA } from '../../shared/constants/filter-configuration.const';
import { mapCampaignsToListItem, mapRewardsToListItem, mapCampaignToListItem, mapRewardToListItem } from '../../shared/utilities/mapping.util';
import { SelfDestruct } from '../../shared/utilities/self-destruct.component';
import { buildParams, mapQueryParamsToFilterObject } from '../../shared/utilities/filter.util';

const ORDERED_CATALOG_NAME = 'bdo deals';

interface IBDOConfig {
  showOrderedCatalogItems: boolean;
}
@Component({
  selector: 'bdo-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent extends SelfDestruct implements OnInit {
  categoryCode: string;
  requestPageSize = 20;
  filterResult: IListItemModel[] = [];
  isLoaded = false;
  pageNumber = 1;
  catalogId: number;
  public showOrderedCatalogItems = false;
  isPaginationCompleted: boolean;
  
  constructor(
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private filterService: FilterService,
    private campaignsService: ICampaignService,
    private configService: ConfigService
  ) {
    super();
  }

  ngOnInit(): void {
    this.configService.readAppConfig<IBDOConfig>().subscribe((config: IConfig<IBDOConfig>) => {
      this.showOrderedCatalogItems = config.custom && config.custom.showOrderedCatalogItems ? config.custom.showOrderedCatalogItems : false;
    });

    combineLatest([
      this.activeRoute.queryParams,
      this.rewardsService.getAllCategories(),
      this.rewardsService.getCatalogs(1, this.requestPageSize)
    ]).subscribe(([params, categories, catalogs]) => {
      this.catalogId = catalogs?.find((catalog: ICatalog) => catalog.name.toLowerCase() === ORDERED_CATALOG_NAME)?.id;
      const filterData = FILTER_DATA;
      console.log(filterData);
      filterData.categories = filterData.categories
        .map(item => {
          const categoryWithId = categories.find(c => c.title.toLowerCase() === item.name.toLowerCase() && !c.parent);
          return {
            ...item,
            id: categoryWithId?.id,
            children: item.children.filter(item =>
              categories.find(t => t.title.toLowerCase() === item.name.toLowerCase() && categoryWithId?.id && t.parent.id === categoryWithId?.id)
            )
              .map(child => ({ ...child, id: categories.find(t => (t.title.toLowerCase() === child.name.toLowerCase()) && (t.parent?.id === categoryWithId?.id)).id }))
          };
        })
        .filter(item => item.id);
      filterData.type = params.type;
      this.categoryCode = params.type;
      this.filterService.setValue(mapQueryParamsToFilterObject(filterData, params));
    })
   

    if (this.showOrderedCatalogItems) {
      this.filterService.filterValue$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe((filterValue: IFilterModel) => {
          if (!filterValue) {
            return [];
          }
          this.isLoaded = false;
          this.pageNumber = 1;
          this.filterResult = [];
          this.getCatalogItems(filterValue);
        });
    } else {
     this.filterService.filterValue$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((filterValue: IFilterModel) => {
          if (!filterValue) {
            return [];
          }
          this.isLoaded = false;
          const queryObject = buildParams(filterValue);
          Object.keys(queryObject).forEach((k) => !queryObject[k] && delete queryObject[k]);
          const campaignsParams = {
            page: this.pageNumber,
            size: this.requestPageSize,
            tags: queryObject.tags,
            categoryIds: queryObject.categoryIds,
            sort_by: 'begins_at'
          };
          Object.keys(campaignsParams).forEach((k) => !campaignsParams[k] && delete campaignsParams[k]);
          return forkJoin([
            this.rewardsService.getRewards(
              this.pageNumber,
              this.requestPageSize,
              queryObject.tags,
              null,
              'en',
              null,
              Sort.descending,
              'begins_at',
              queryObject.categoryIds
            ),
            this.campaignsService.getCampaigns(campaignsParams)
              .pipe(
                catchError(() => of([])),
                mergeMap((campaigns:ICampaign[]) => iif(() => campaigns.length > 0,
                  // for each campaign, get detailed version=
                  combineLatest(
                    ...campaigns.map((campaign) =>
                      this.campaignsService
                        .getCampaign(campaign.id)
                        .pipe(catchError(() => of(void 0)))
                    )
                  ),
                  of([])
                  )
                )
              )
          ]);
        }),
        filter(value => value.length))
        .subscribe(([rewards, campaigns]) => {
          this.isLoaded = true;
          const listItem = mapCampaignsToListItem(campaigns).concat(mapRewardsToListItem(rewards));
          listItem.sort(function(firstItem, secondItem) {
            return new Date(secondItem.createdAt).getTime() - new Date(firstItem.createdAt).getTime();
          });
          this.filterResult.push(...listItem);
        });
    }    
  }

  public getCatalogItems(filterValue: IFilterModel): void {
    let rewardIds, campaignIds, catalogItems;
    const queryObject = buildParams(filterValue);
    Object.keys(queryObject).forEach((k) => !queryObject[k] && delete queryObject[k]);
    const campaignsParams = {
      page: this.pageNumber,
      size: this.requestPageSize,
      tags: queryObject.tags,
      categoryIds: queryObject.categoryIds,
      // sort_by: 'begins_at'
    };
    Object.keys(campaignsParams).forEach((k) => !campaignsParams[k] && delete campaignsParams[k]);

    this.rewardsService.getCatalogItems(
        this.catalogId,
        this.pageNumber,
        this.requestPageSize,
        'en',
        queryObject.categoryIds,
        queryObject.tags?.filter(tag => tag !== 'new'),
        queryObject.tags?.includes('new') ? Sort.descending : null,
        queryObject.tags?.includes('new') ? 'begins_at' : null)      
    .pipe(
    tap((items: ICatalogItem[]) => {
      catalogItems = items;
      this.pageNumber++;
      this.isPaginationCompleted = catalogItems?.length < this.requestPageSize;
      rewardIds = items?.filter(item => item.itemType === 'Reward::Campaign')?.map(item => item.itemId);
      campaignIds  = items?.filter(item => item.itemType === 'Campaign')?.map(item => item.itemId);
    }),
    switchMap(() => 
      forkJoin([
        iif(() => rewardIds && rewardIds.length > 0 , this.rewardsService.getRewardsById(rewardIds, this.requestPageSize)
        .pipe(catchError(() => of([]))), of([])),
        iif(() => campaignIds && campaignIds.length > 0, this.campaignsService.getCampaignsById(campaignIds, this.requestPageSize)
        .pipe(
          catchError(() => of([])),
        )
        , of([]))
      ])
    )).
    subscribe(([rewards, campaigns]) => { 
      this.isLoaded = true;
      const listItems =[];
      catalogItems?.forEach((item: ICatalogItem) => {
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
      this.filterResult.push(...listItems);
    });
  }

  public onScroll(): void {
    if (this.isPaginationCompleted) {
      return;
    } 
    if (this.showOrderedCatalogItems) {
      this.getCatalogItems(this.filterService.currentValue);
    }
  }
}
