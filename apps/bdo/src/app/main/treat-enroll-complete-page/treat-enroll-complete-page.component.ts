import { Component, OnInit } from '@angular/core';
import { LIST_SIMILAR_DEALS } from '../../mock-data/similar-deals.mock';
@Component({
  selector: 'bdo-treat-enroll-complete-page',
  templateUrl: './treat-enroll-complete-page.component.html',
  styleUrls: ['./treat-enroll-complete-page.component.scss']
})
export class TreatEnrollCompletePageComponent implements OnInit{
  similarDeals = LIST_SIMILAR_DEALS;
  promoId:string;
  public promoName: string;
  public promoTNC: string;

  dealDetail = {
    id: 1,
    image: './assets/images/Group_10985@2x.png',
    title: '40% OFF at New World Makati Hotel',
    description: 'Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card.',
  };
  ngOnInit(){
    this.promoId = history.state.promoId;
    this.promoName = history.state.promoName;
    this.promoTNC = history.state.promoTNC;
  }
}