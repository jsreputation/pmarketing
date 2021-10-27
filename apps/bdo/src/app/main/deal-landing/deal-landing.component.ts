import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IReward, RewardsService } from '@perxtech/core';
import { FeaturedDeals } from '../../models/featured-deals.models';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'bdo-deal-landing',
  templateUrl: './deal-landing.component.html',
  styleUrls: ['./deal-landing.component.scss'],
})
export class DealLandingComponent implements OnInit {
  similarDeals: IReward[];
  dealDetail: IReward;
  navigateTo(_selectedItem: FeaturedDeals) {
    throw new Error('not implemented');
  }
  constructor(
    private rewardService: RewardsService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      combineLatest([
        this.rewardService.getReward(param.rid),
        this.rewardService.getRewardsRelated(param.rid),
      ]).subscribe(([dealDetail, similarDeals]) => {
        this.dealDetail = dealDetail;
        this.similarDeals = similarDeals;
      });
    });
  }
  navigateLocationPage(){
    this.route.navigate([`deal-welcome/${this.dealDetail.id}/location`]);
  }
}
