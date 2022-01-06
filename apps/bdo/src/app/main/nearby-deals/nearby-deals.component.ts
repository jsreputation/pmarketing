import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perxtech/core';
import { IPosition } from './map/map.component';
import { FilterService } from '../../shared/services/filter.service';
import { FILTER_DATA } from '../../shared/constants/filter-configuration.const';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { mapQueryParamsToFilterObject } from '../../shared/utilities/filter.util';
import { IListItemModel } from '../../shared/models/list-item.model';
import { mapRewardsToListItem } from '../../shared/utilities/mapping.util';

@Component({
  selector: 'bdo-nearby-deals',
  templateUrl: './nearby-deals.component.html',
  styleUrls: ['./nearby-deals.component.scss'],
})
export class NearbyDealsComponent implements OnInit{
  public rewards: IReward[];
  public rewardsItemModel: IListItemModel[];
  public rad = 2000;
  public currentPosition: IPosition;
  private queryParams: Params;
  public locationIcon = 'assets/images/icon-location-filled.svg';
  public catalogueIcon = 'assets/images/icon-n-catalogue-unselect.svg';
  constructor(
    public filterService: FilterService,
    private rewardService: RewardsService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.activeRoute.queryParams,
      this.rewardService.getAllCategories(),
    ]).subscribe(([params, categories]) => {
      this.queryParams = params;
      const filterData = FILTER_DATA;
      filterData.categories = filterData.categories
        .map(item => ({
          ...item,
          id: categories.find(c => c.title === item.name)?.id,
          children: item.children.filter(item => categories.find(t => t.title === item.name))
        }))
        .filter(item => item.id);
      filterData.type = params.type;
      this.filterService.setValue(mapQueryParamsToFilterObject(filterData, this.queryParams));
      this.getRewardNearBy();
    })
  }

  selectedItem(item: IListItemModel) {
    this.route.navigate(['deal-welcome', item.id])
  }

  getRewardNearBy() {
    const locations = this.queryParams?.locations ? [`location-${this.queryParams?.locations}`] : [];
    const tags  = (this.queryParams?.tags || []).concat(locations);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.rewardService.nearMe(this.rad, this.currentPosition.lat, this.currentPosition.lng, null, null,
          tags,
          this.queryParams.category?.length > 0 ? this.queryParams.category : this.queryParams.type)
          .subscribe((rewards) => {
            this.rewards = rewards;
            this.rewardsItemModel = mapRewardsToListItem(rewards);
          });
      });
    }
  }

  filter() {
    this.filterService.showFilterDialog(value => {
      if (value) {
        this.buildFilterQueryParamsAndNavigate(value);
      }
    });
  }

  private buildFilterQueryParamsAndNavigate(filterValue) {
    const parentCategory = filterValue.categories.find(item => item.selected);
    const childCategories = parentCategory?.children.filter(item => item.selected).map(sub => sub.type);
    const tags = filterValue.tags.filter(tag => tag.selected).map(item => item.type);
    const locations = filterValue.locations.filter(location=> location.selected).map(location=>location.type);

    const queryParams = {
      type: parentCategory?.type,
      category: parentCategory?.children && childCategories?.length === parentCategory.children.length ? null : childCategories,
      tags: tags.length === filterValue.tags.length ? null : tags,
      locations: locations.length === filterValue.locations.length ? null : locations
    };
    this.route.navigate(['nearby'], { queryParams: queryParams });
  }

  public tabChange(idx:number) {
    switch (idx) {
      case 1:{
        this.locationIcon = 'assets/images/icon-n-location.svg';
        this.catalogueIcon = 'assets/images/icon-n-catalogue.svg';
      }
        break;
      case 2:{
        this.locationIcon = 'assets/images/icon-n-location.svg';
        this.catalogueIcon = 'assets/images/icon-n-catalogue-unselect.svg';
      }
        break;
      default: {
        this.locationIcon = 'assets/images/icon-location-filled.svg';
        this.catalogueIcon = 'assets/images/icon-n-catalogue-unselect.svg';
      }
        break;
    }
  }
}
