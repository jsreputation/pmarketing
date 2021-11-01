import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IReward, NotificationService, RewardsService } from '@perxtech/core';
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
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;
  public teamCodeShareText: string;
  public shareText: string;
  navigateTo(_selectedItem: FeaturedDeals) {
    throw new Error('not implemented');
  }
  constructor(
    private rewardService: RewardsService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private notificationService: NotificationService,
  ) {}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      combineLatest([
        this.rewardService.getReward(param.rid),
        this.rewardService.getRewardsRelated(param.rid),
      ]).subscribe(([dealDetail, similarDeals]) => {
        this.dealDetail = dealDetail;
        this.similarDeals = similarDeals;
          // this.shareText = dealDetail.displayProperties?.inviteMessage?.description || '';
          // this.teamCodeShareText = dealDetail.displayProperties?.inviteMessage?.codeBlurb || '';
      });
    });
  }
  navigateLocationPage(){
    this.route.navigate([`deal-welcome/${this.dealDetail.id}/location`]);
  }
  shareDeal(){
    if (navigator.share) {
      const data = {
        text: `${this.shareText}\n${this.teamCodeShareText}`,
      };
      // @ts-ignore
      (navigator as any)
        .share(data)
        .then(() => { })
        .catch(() => {
          console.log('failed to use share, falling back to clipboard');
          this.copy();
        });
    } else {
      console.log('no access to share api, falling back to clipboard');
      this.copy();
    }
  }
  public copy(): void {
    navigator.clipboard
      .writeText(`${this.dealDetail.name}`)
      .then(() => this.notificationService.addSnack(this.copyToClipboardTxt))
      .catch(() => this.notificationService.addSnack(this.clipboardErrorTxt));
  }
}
