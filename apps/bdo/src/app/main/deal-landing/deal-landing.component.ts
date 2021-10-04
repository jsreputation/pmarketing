import { Component } from '@angular/core';
import { FeaturedDeals } from '../../models/featured-deals.models';
import { LIST_SIMILAR_DEALS } from '../../mock-data/similar-deals.mock';

@Component({
  selector: 'bdo-deal-landing',
  templateUrl: './deal-landing.component.html',
  styleUrls: ['./deal-landing.component.scss']
})
export class DealLandingComponent {
  similarDeals = LIST_SIMILAR_DEALS;
  dealDetail = {
    id: 1,
    image: './assets/images/Group_10985@2x.png',
    title: '40% OFF at New World Makati Hotel',
    description: 'Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card.',
  };

  navigateTo(_selectedItem: FeaturedDeals) {
    throw new Error('not implemented');
  }
}
