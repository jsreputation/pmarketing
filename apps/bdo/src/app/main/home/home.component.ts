import { Component, OnInit } from '@angular/core';
import { LIST_CATEGORY } from '../../mock-data/categories.mock';
import { LIST_FEATURED_DEALS } from './../../mock-data/featured-deals.mock';
import { FeaturedDeals } from '../../models/featured-deals.models';
import { IReward, RewardsService } from '@perxtech/core';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'bdo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  categories = LIST_CATEGORY;
  nearBy: IReward[] = [];
  featuredDeals = LIST_FEATURED_DEALS;
  whatsNew: IReward[] = [];
  popular: IReward[] = [];

  requestPageSize = 10;
  tag = {
    new: 'new',
    popular: 'popular',
    nearby: 'nearby',
    featured: 'featured',
  };
  requestPageSize = 10;
  constructor(private rewardsService: RewardsService, private route: Router) {}
  ngOnInit(): void {
    this.rewardsService
      .getRewards(
        1,
        this.requestPageSize,
        ['new']
      )
      .subscribe((newRewards) => {
        this.whatsNew = newRewards;
      });
    this.rewardsService
      .getRewards(
        1,
        this.requestPageSize,
        ['popular']
      )
      .subscribe((popularRewards) => {
        this.popular = popularRewards;
      });
  }

  ngOnInit(): void {
    this.rewardService
      .getRewards(1, this.requestPageSize,[this.tag.nearby])
      .subscribe((nearBy: IReward[]) => {
        this.nearBy = nearBy;
      });
  }
  navigateTo(_selectedItem: FeaturedDeals) {
    this.route.navigate([`deal-welcome/${_selectedItem.id}`]);
  }

  navigateToSearchResult(tag: string) {
    const queryParams: Params = { tags: tag };
    this.route.navigate([`result`], {queryParams: queryParams});
  }
}
