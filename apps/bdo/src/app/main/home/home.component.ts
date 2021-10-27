import { Component, OnInit } from '@angular/core';
import { LIST_CATEGORY } from '../../mock-data/categories.mock';
import { FeaturedDeals } from '../../models/featured-deals.models';
import { IReward, RewardsService } from '@perxtech/core';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'bdo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories = LIST_CATEGORY;
  featuredDeals: IReward[] = [];

  nearByDeals: IReward[] = [];
  whatsNewDeals: IReward[] = [];
  popularDeals: IReward[] = [];

  requestPageSize = 10;
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
  constructor(private rewardsService: RewardsService, private route: Router) {}
  ngOnInit(): void {
    this.rewardsService
      .nearMe(this.rad,this.currentPosition.lat,this.currentPosition.lng, 1, this.requestPageSize)
      .subscribe((nearBy: IReward[]) => {
        this.nearByDeals = nearBy;
      });
    this.rewardsService
      .getRewards(1, this.requestPageSize, [this.tag.new])
      .subscribe((newRewards: IReward[]) => {
        this.whatsNewDeals = newRewards;
      });
    this.rewardsService
      .getRewards(1, this.requestPageSize, [this.tag.popular])
      .subscribe((popularRewards: IReward[]) => {
        this.popularDeals = popularRewards;
      });
    this.rewardsService
    .getRewards(1, this.requestPageSize, [this.tag.featured])
      .subscribe((featuredDeals: IReward[]) => {
        this.featuredDeals = featuredDeals;
      });
  }
  navigateTo(_selectedItem: FeaturedDeals) {
    this.route.navigate([`deal-welcome/${_selectedItem.id}`]);
  }

  navigateToSearchResult(tag: string) {
    const queryParams: Params = { tags: tag };
    this.route.navigate([`result`], { queryParams: queryParams });
  }

  navigateToNearByDeals() {
    this.route.navigate([`nearby`]);
  }
}
