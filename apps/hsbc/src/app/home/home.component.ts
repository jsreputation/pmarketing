import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICampaignService, CampaignType, NotificationService, IStampCard, IConfig, ConfigService, ICampaign, StampService } from '@perx/core';
import {map, mergeMap, tap, toArray} from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public campaigns: ICampaign[];
  public campaignId: number;
  public selectedTab: number = 0;
  private displayCampaignAs: string = 'puzzle';
  public puzzleTextFn: () => string;

  constructor(
    private router: Router,
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private configService: ConfigService,
    private stampService: StampService,
  ) { }

  public ngOnInit(): void {

    this.configService.readAppConfig().subscribe(
      (config: IConfig) => {
        if (config.sourceType === 'hsbc-xmas') {
          this.displayCampaignAs = 'stamp_card';
          this.puzzleTextFn = () => 'new stamps';
        }
      });

    this.fetchCampaign();

    this.activeRoute.queryParamMap.subscribe(ps => {
      const tab: string = ps.get('tab');
      if (tab === 'history') {
        this.selectedTab = 1;
      }
    });
  }

  private fetchCampaign(): void {
    this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CampaignType.stamp)),
        map(campaigns => {
          if (this.displayCampaignAs === 'puzzle') {
            return campaigns.filter(camp => camp.type === CampaignType.stamp).slice(0, 1);
          }
          return campaigns;
        }),
        tap((campaigns: ICampaign[]) => this.campaigns = campaigns),
        mergeMap(
          (campaigns: ICampaign[]) => from(campaigns).pipe(
            mergeMap((campaign: ICampaign) => this.fetchCard(campaign.id)),
            toArray(),
            map((stampCards: IStampCard[]) => {
              return stampCards.filter(
                card => card.displayProperties.displayCampaignAs &&
                  card.displayProperties.displayCampaignAs === this.displayCampaignAs);
            }),
            map((cards: IStampCard[]) => cards[0])
          )
        ),
      )
      .subscribe((card: IStampCard) => {
        this.campaignId = card.campaignId;
      });
  }

  private fetchCard(id: number): Observable<IStampCard> {
    return this.stampService.getCurrentCard(id);
  }

  public onRoute(id: string): void {
    this.router.navigate([`/voucher/${id}`]);
  }

  public selected(puzzle: IStampCard): void {
    this.router.navigate([`/puzzle/${this.campaignId}/${puzzle.id}`]);
  }

  public completed(): void {
    if (this.displayCampaignAs === 'puzzle') {
      this.notificationService.addPopup({
        // tslint:disable-next-line: max-line-length
        text: 'Thank you for joining the HSBC Collect V2.0 Promo! You have already received the maximum number of puzzle pieces. Don\'t forget to redeem your earned rewards!'
      });
    }
  }
}
