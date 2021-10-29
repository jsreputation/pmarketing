import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ICampaign,
  ICampaignService,
} from '@perxtech/core';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'bdo-treat-welcome',
  templateUrl: './treat-welcome.component.html',
  styleUrls: ['./treat-welcome.component.scss'],
})
export class TreatWelcomeComponent implements OnInit {
  defaultImageUrl = 'assets/images/light-gray-color-default-image.png';
  campaign: ICampaign;
  constructor(
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((param: Params) => this.campaignService.getCampaign(param.id))
      )
      .subscribe((campaign) => {
        this.campaign = campaign;
      });
  }
  navigateEnrollPage() {
    this.route.navigate([`treat-enroll/${this.campaign.id}`]);
  }
}
