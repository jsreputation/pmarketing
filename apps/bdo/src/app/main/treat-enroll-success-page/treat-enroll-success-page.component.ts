import { Component, OnInit } from '@angular/core';
import { LIST_SIMILAR_DEALS } from '../../mock-data/similar-deals.mock';
@Component({
  selector: 'bdo-treat-enroll-success-page',
  templateUrl: './treat-enroll-success-page.component.html',
  styleUrls: ['./treat-enroll-success-page.component.scss']
})
export class TreatEnrollSuccessPageComponent {
  similarDeals = LIST_SIMILAR_DEALS;
  dealDetail = {
    id: 1,
    image: './assets/images/Group_10985@2x.png',
    title: '40% OFF at New World Makati Hotel',
    description: 'Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card.',
  };
}
