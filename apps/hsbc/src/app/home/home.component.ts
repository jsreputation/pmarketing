import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { IPopupConfig, PopupComponent, CampaignService, ICampaign, CAMPAIGN_TYPE } from '@perx/core/dist/perx-core';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  campaigns: ICampaign[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private activeRoute: ActivatedRoute,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.campaignService.getCampaigns()
      .pipe(
        map(data => data.data),
        map(campaigns => campaigns.filter(camp => camp.campaign_type === CAMPAIGN_TYPE.stamp))
      )
      .subscribe(campaigns => {
        this.campaigns = campaigns;
      });

    this.activeRoute.paramMap.subscribe(params => {
      const popup = params.get('popup');
      if (popup === 'expired') {
        this.expiredPopup();
      } else if (popup === 'completed') {
        this.completedPopup();
      }
    });
  }

  onRoute(id: string) {
    this.router.navigate([`/voucher/${id}`]);
  }

  completedPopup() {
    this.popup({
      text: 'See the treats you\'ve earned and don\'t forget to redeem them before they\'re gone!',
      title: 'You\'ve already completed the game',
      buttonTxt: 'See my treats'
    });
  }

  expiredPopup(date: Date = null) {
    const text = date === null ? 'This campaign has ended' : `This campaign has ended on ${this.datePipe.transform(date, 'mediumDate')}`;
    this.popup({
      text,
      title: 'We\'re sorry, the treats have expired'
    });

  }

  private popup(data: IPopupConfig) {
    this.dialog.open(PopupComponent, { data })
      .afterClosed()
      .subscribe(() => { this.router.navigate(['/home']); });
  }
}
