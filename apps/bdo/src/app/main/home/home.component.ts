import { Component } from '@angular/core';
import { LIST_CATEGORY } from '../../mock-data/categories.mock';
import { LIST_FEATURED_DEALS } from './../../mock-data/featured-deals.mock';
import { FeaturedDeals } from '../../models/featured-deals.models';
import { IReward, RewardsService } from '@perxtech/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bdo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  categories = LIST_CATEGORY;
  nearBy: IReward[] = [];
  featuredDeals = LIST_FEATURED_DEALS;
  requestPageSize = 10;
  tag = {
    new: 'new',
    popular: 'popular',
    nearby: 'nearby',
    featured: 'featured',
  };
  constructor(private route: Router, private rewardService: RewardsService) {}

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
}
