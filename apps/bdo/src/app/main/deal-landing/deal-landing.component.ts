import { TAGS } from './../../shared/constant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IReward, RewardsService } from '@perxtech/core';
import { FeaturedDeals } from '../../models/featured-deals.models';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'bdo-deal-landing',
  templateUrl: './deal-landing.component.html',
  styleUrls: ['./deal-landing.component.scss'],
})
export class DealLandingComponent implements OnInit {
  TAGS=TAGS;
  similarDeals: IReward[];
  dealDetail: IReward;
  tags: {name:string, className:string}[] =[];
  navigateTo(_selectedItem: FeaturedDeals) {
    throw new Error('not implemented');
  }
  constructor(
    private rewardService: RewardsService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      combineLatest([
        this.rewardService.getReward(param.rid),
        this.rewardService.getRewardsRelated(param.rid),
      ]).subscribe(([dealDetail, similarDeals]) => {
        this.dealDetail = dealDetail;
        this.similarDeals = similarDeals;
        this.dealDetail.tags.some(item=>{
          const tag = TAGS.find(tag=> tag.name.toLowerCase() === item.name.toLowerCase());
          if(tag) {
            this.tags.push(tag);
          }
        });
      });
    });
  }
}
