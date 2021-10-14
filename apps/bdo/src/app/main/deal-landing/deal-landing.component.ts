import { Component } from '@angular/core';
import { IReward, RewardsService } from '@perxtech/core';
import { FeaturedDeals } from '../../models/featured-deals.models';
@Component({
  selector: 'bdo-deal-landing',
  templateUrl: './deal-landing.component.html',
  styleUrls: ['./deal-landing.component.scss']
})
export class DealLandingComponent {
  similarDeals: IReward[];
  dealDetail = {
    id: 1,
    image: './assets/images/Group_10985@2x.png',
    title: '40% OFF at New World Makati Hotel',
    description: 'Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card.',
  };
  // lstDealDetail : IReward[];
  navigateTo(_selectedItem: FeaturedDeals) {
    throw new Error('not implemented');
  }
  constructor(private rewardService: RewardsService) {
    this.rewardService.getRewardsRelated(1).subscribe(response => {
      console.log(response)
      this.similarDeals = response

    })
  }
}
