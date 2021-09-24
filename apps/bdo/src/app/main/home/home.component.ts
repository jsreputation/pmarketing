import { Component } from '@angular/core';
import { LIST_CATEGORY } from '../../mock-data/categories.mock';
import { LIST_NEAR_BY } from '../../mock-data/near-by.mock';
import { LIST_FEATURED_DEALS } from './../../mock-data/featured-deals.mock';
import { FeaturedDeals } from '../../models/featured-deals.models';

@Component({
  selector: 'bdo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  categories = LIST_CATEGORY;
  nearBy = LIST_NEAR_BY;
  featuredDeals = LIST_FEATURED_DEALS;

  navigateTo(_selectedItem: FeaturedDeals) {
    throw new Error('not implemented');
  }
}
