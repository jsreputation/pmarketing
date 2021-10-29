import { IListItemModel } from '../../shared/models/list-item.model';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICampaignService, RewardsService } from '@perxtech/core';
import { FilterService } from '../../shared/services/filter.service';
import { Observable, forkJoin } from 'rxjs';
import { IFilterModel } from '../../shared/models/filter.model';
import { FILTER_DATA } from '../../shared/constants/filter-configuration.const';
import { mapCampaignsToListItem, mapRewardsToListItem } from '../../shared/utilities/mapping.util';
import { SelfDestruct } from '../../shared/utilities/self-destruct.component';


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
    this.activeRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.filterService.setValue(this.mapQueryParamsToFilterObject(FILTER_DATA, params));
        this.categoryCode = params.type;
    });
    this.filterResult$ = this.filterService.filterValue$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((filterValue: IFilterModel) => {
          const queryObject = this.buildParams(filterValue);
          Object.keys(queryObject).forEach((k) => !queryObject[k] && delete queryObject[k]);
          const campaignsParams = {
            page: this.pageNumber,
            size: this.requestPageSize,
            tags: queryObject.tags,
            categories: queryObject.categories
          };
          Object.keys(campaignsParams).forEach((k) => !campaignsParams[k] && delete campaignsParams[k]);
          return forkJoin([
            this.rewardsService.getRewards(
              this.pageNumber,
              this.requestPageSize,
              queryObject.tags,
              queryObject.categories
            ),
            this.campaignsService.getCampaigns(campaignsParams),
          ]);
        }),
        map(([rewards, campaigns]) => {
          const listItem = mapCampaignsToListItem(campaigns).concat(mapRewardsToListItem(rewards));
          return listItem.sort(function(firstItem, secondItem) {
            return new Date(secondItem.createdAt).getTime() - new Date(firstItem.createdAt).getTime();
          });
        }));
  }

  buildParams(filterValue: IFilterModel) {
    return {
      tags: this.handleTags(filterValue),
      categories: this.handleCategory(filterValue)
    };
  }

  public mapQueryParamsToFilterObject(filterValue: IFilterModel, queryParams) {
    filterValue = {
      ...filterValue,
      categories: filterValue.categories.map(cate =>
        cate.type === queryParams.type || !queryParams.type ?
          {
            ...cate,
            selected: true,
            children: cate.children ? cate.children.map(sub =>
              !queryParams.category || this.equalOrIncludes(sub.type, queryParams.category) ?
                {
                  ...sub,
                  selected: true
                } : sub
            ) : []
          } : cate
      ),
      tags: filterValue.tags.map(item => !queryParams.tags || this.equalOrIncludes(item.type, queryParams.tags) ? {
        ...item,
        selected: true
      } : item),
      cardType: filterValue.cardType.map(item => !queryParams.cardType || this.equalOrIncludes(item.type, queryParams.cardType) ? {
        ...item,
        selected: true
      } : item),
    };

    return filterValue;
  }

  handleTags(filterValue: IFilterModel) {
    const cardTypes = filterValue.cardType.filter(card => card.selected).map(card => card.type);
    const tags = filterValue.tags.filter(tag => tag.selected).map(tag => tag.type);
    let tagsParams = null;
    if (cardTypes.length) {
      tagsParams = cardTypes.length === FILTER_DATA.cardType.length ? null : cardTypes;
    } else {
      tagsParams = tags.length === FILTER_DATA.tags.length ? null : tags;
    }
    return tagsParams;
  }

  handleCategory(filterValue: IFilterModel) {
    let categories = [];
    const selectedSpecialCategories = filterValue.categories.filter(item => item.selected
    && ['spend-anywhere', 'shop-choose-redeem', 'online-exclusive'].includes(item.type));
    if (selectedSpecialCategories.length) {
      return selectedSpecialCategories.map(item => item.type);
    } else {
      const selectedCategory = filterValue.categories.find(item => item.selected);
      categories = selectedCategory.children.filter(subCategory => subCategory.selected).map(value => value.type);
      return categories.length === selectedCategory.children.length ? null : categories;
    }
  }

  private equalOrIncludes(type, values) {
    if (Array.isArray(values)) {
      return values.includes(type);
    }
    return values === type;
  }
}
