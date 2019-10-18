import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICampaignService, CampaignType, NotificationService, IStampCard } from '@perx/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public campaignId: number;
  public selectedTab: number = 0;

  constructor(
    private router: Router,
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CampaignType.stamp).slice(0, 1))
      )
      .subscribe(
        campaigns => {
          console.log(campaigns);
          this.campaignId = campaigns[0].id;
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

  public onRoute(id: string): void {
    this.router.navigate([`/voucher/${id}`]);
  }

  public selected(puzzle: IStampCard): void {
    this.router.navigate([`/puzzle/${this.campaignId}/${puzzle.id}`]);
  }

  public completed(): void {
    this.notificationService.addPopup({
      // tslint:disable-next-line: max-line-length
      text: 'Thank you for joining the HSBC Collect V2.0 Promo! You have already received the maximum number of puzzle pieces. Don\'t forget to redeem your earned rewards!'
    });
  }
}
