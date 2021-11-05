import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perxtech/core';
import { IPosition } from './map/map.component';
import { FilterService } from '../../shared/services/filter.service';
import { FILTER_DATA } from '../../shared/constants/filter-configuration.const';
@Component({
  selector: 'bdo-nearby-deals',
  templateUrl: './nearby-deals.component.html',
  styleUrls: ['./nearby-deals.component.scss'],
})
export class NearbyDealsComponent implements OnInit{
  public rewards: IReward[];
  public rad = 10000;
  public currentPosition: IPosition;

  constructor(
    public filterService: FilterService,
    private rewardService: RewardsService
  ) {}

  ngOnInit(): void {
    this.filterService.setValue(FILTER_DATA);
    this.getRewardNearBy()
  }

  selectedItem(item: IReward) {
    console.log(item);
  }

  getRewardNearBy() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.rewardService
          .nearMe(this.rad, this.currentPosition.lat, this.currentPosition.lng)
          .subscribe((rewards) => {
            this.rewards = rewards;
          });
      });
    }
  }

  filter() {
    this.filterService.showFilterDialog(value => {
      if (value) {
        const parentCategory = value.categories.find(item => item.selected);
        const childCategories = parentCategory?.children.filter(item => item.selected).map(sub => sub.type);
        const tags = value.tags.filter(tag => tag.selected).map(item => item.type);
        const categories = parentCategory?.children && childCategories?.length === parentCategory.children.length ? null : childCategories;

        this.rewardService.nearMe(this.rad, this.currentPosition.lat, this.currentPosition.lng, null, null, tags, categories)
          .subscribe((rewards) => {
          this.rewards = rewards;
        });
      }
    });
  }
}
