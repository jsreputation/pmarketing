import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService, ICampaign, CAMPAIGN_TYPE, NotificationService } from '@perx/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  campaigns: ICampaign[];
  selectedTab = 0;

  constructor(
    private router: Router,
    private campaignService: CampaignService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CAMPAIGN_TYPE.stamp).slice(0, 1))
      )
      .subscribe(
        campaigns => {
          this.campaigns = campaigns;
        },
        () => {
          this.notificationService.addPopup(
            {
              title: 'Sorry, something went wrong'
            }
          );
        }
      );

    this.activeRoute.queryParamMap.subscribe(ps => {
      const tab: string = ps.get('tab');
      if (tab === 'history') {
        this.selectedTab = 1;
      }
    });
  }

  onRoute(id: string) {
    this.router.navigate([`/voucher/${id}`]);
  }
}
