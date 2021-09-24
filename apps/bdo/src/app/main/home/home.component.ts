import { Component } from '@angular/core';
import { LIST_CATEGORY } from '../../mock-data/categories.mock';
import { FeaturedDeals } from './../../models/featured-deals.models';
import { LIST_FEATURED_DEALS } from './../../mock-data/featured-deals.mock';

@Component({
  selector: 'bdo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  categories = LIST_CATEGORY;
  featuredDeals = LIST_FEATURED_DEALS;

  navigateTo(_selectedItem: FeaturedDeals) {
    throw new Error('not implemented');
  }
}
