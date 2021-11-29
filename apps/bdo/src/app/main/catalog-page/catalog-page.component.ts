import { IListItemModel } from '../../shared/models/list-item.model';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICampaignService, RewardsService, Sort } from '@perxtech/core';
import { FilterService } from '../../shared/services/filter.service';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { IFilterModel } from '../../shared/models/filter.model';
import { FILTER_DATA } from '../../shared/constants/filter-configuration.const';
import { mapCampaignsToListItem, mapRewardsToListItem } from '../../shared/utilities/mapping.util';
import { SelfDestruct } from '../../shared/utilities/self-destruct.component';
import { buildParams, mapQueryParamsToFilterObject } from '../../shared/utilities/filter.util';


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
    ]).subscribe(([params, categories]) => {
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
            this.campaignsService.getCampaigns(campaignsParams),
          ]);
        }),
        filter(value => value.length),
        map(([rewards, campaigns]) => {
          this.isLoaded = true;
          const listItem = mapCampaignsToListItem(campaigns).concat(mapRewardsToListItem(rewards));
          return listItem.sort(function(firstItem, secondItem) {
            return new Date(secondItem.createdAt).getTime() - new Date(firstItem.createdAt).getTime();
          });
        }));
  }
}
