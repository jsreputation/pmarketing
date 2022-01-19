import { IListItemModel } from '../../shared/models/list-item.model';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICampaignService, RewardsService, Sort, ICatalogItem, ICatalog } from '@perxtech/core';
import { FilterService } from '../../shared/services/filter.service';
import { Observable, forkJoin, combineLatest, of, iif } from 'rxjs';
import { IFilterModel } from '../../shared/models/filter.model';
import { FILTER_DATA } from '../../shared/constants/filter-configuration.const';
import { mapCampaignToListItem, mapRewardToListItem } from '../../shared/utilities/mapping.util';
import { SelfDestruct } from '../../shared/utilities/self-destruct.component';
import { buildParams, mapQueryParamsToFilterObject } from '../../shared/utilities/filter.util';

const ORDERED_CATALOG_NAME = 'Bdo deals';
@Component({
  selector: 'bdo-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent extends SelfDestruct implements OnInit {
  categoryCode: string;
  requestPageSize = 100;
  filterResult$: Observable<IListItemModel[]> = null;
  isLoaded = false;
  pageNumber = 1;
  catalogId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private filterService: FilterService,
    private campaignsService: ICampaignService
  ) {
    super();
  }

  ngOnInit(): void {
    combineLatest([
      this.activeRoute.queryParams,
      this.rewardsService.getAllCategories(),
      this.rewardsService.getCatalogs(1, this.requestPageSize)
    ]).subscribe(([params, categories, catalogs]) => {
      this.catalogId = catalogs?.find((item: ICatalog) => item.name === ORDERED_CATALOG_NAME)?.id;
      const filterData = FILTER_DATA;
      filterData.categories = filterData.categories
        .map(item => {
          const categoryWithId = categories.find(c => c.title.toLowerCase() === item.name.toLowerCase() && !c.parent);
          return {
            ...item,
            id: categoryWithId?.id,
            children: item.children.filter(item =>
              categories.find(t => t.title.toLowerCase() === item.name.toLowerCase() && categoryWithId?.id && t.parent.id === categoryWithId?.id)
            )
              .map(child => ({ ...child, id: categories.find(t => t.title.toLowerCase() === child.name.toLowerCase()).id }))
          };
        })
        .filter(item => item.id);
      filterData.type = params.type;
      this.categoryCode = params.type;
      this.filterService.setValue(mapQueryParamsToFilterObject(filterData, params));
    })
    let rewardIds, campaignIds, catalogItems;

    this.filterResult$ = this.filterService.filterValue$
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
            // sort_by: 'begins_at'
          };
          Object.keys(campaignsParams).forEach((k) => !campaignsParams[k] && delete campaignsParams[k]);

          return this.rewardsService.getCatalogItems(
              this.catalogId,
              this.pageNumber,
              this.requestPageSize,
              'en',
              queryObject.categoryIds,
              queryObject.tags?.filter(tag => tag !== 'new'),
              queryObject.tags?.includes('new') ? Sort.descending : null,
              queryObject.tags?.includes('new') ? 'begins_at' : null)      
           }),
          tap((items: ICatalogItem[]) => {
            catalogItems = items;
            rewardIds = items?.filter(item => item.itemType === 'Reward::Campaign')?.map(item => item.itemId);
            campaignIds  = items?.filter(item => item.itemType === 'Campaign')?.map(item => item.itemId);
          }),
          switchMap(() => 
            forkJoin([
              iif(() => rewardIds && rewardIds.length > 0 , this.rewardsService.getRewardsById(rewardIds)
              .pipe(catchError(() => of([]))), of([])),
              iif(() => campaignIds && campaignIds.length > 0, this.campaignsService.getCampaignsById(campaignIds, campaignIds.length)
              .pipe(
                catchError(() => of([])),
               /* mergeMap((campaigns:ICampaign[]) => iif(() => campaigns.length > 0,
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
                )*/
              )
              , of([]))
            ])
          ),
        map(([rewards, campaigns]) => { 
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
          return listItems;
        }));
  }
}
