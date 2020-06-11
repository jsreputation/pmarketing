import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { ICampaign, CampaignType, ICampaignService, IStampCard, ConfigService, StampService } from '@perxtech/core';
import { catchError, map, scan, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { IMacaron, MacaronService } from '../../services/macaron.service';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../utils/fade-animations';

const REQ_PAGE_SIZE: number = 10;

interface ICampaignWithMacaron extends ICampaign {
  macaron?: IMacaron | null;
}
@Component({
  selector: 'app-stamp-cards',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn())
  ],
  templateUrl: './stamp-cards.component.html',
  styleUrls: ['./stamp-cards.component.scss']
})

export class StampCardsComponent implements OnInit {
  public campaigns$: Observable<ICampaignWithMacaron[]>;
  public ghostCampaigns: any[] = new Array(3);
  public campaignsSubj: BehaviorSubject<ICampaignWithMacaron[]> = new BehaviorSubject<ICampaignWithMacaron[]>([]);
  public stampCards: IStampCard[];
  public campaignsPageId: number = 1;
  public campaignsEnded: boolean = false;

  @Output()
  public tapped: EventEmitter<number> = new EventEmitter();

  constructor(
    private campaignService: ICampaignService,
    private stampService: StampService,
    private macaronService: MacaronService,
    private configService: ConfigService,
    private cd: ChangeDetectorRef
  ) {
    this.initCampaignsScan();
  }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(() => {
      this.loadCampaigns();
    });
  }

  public loadCampaigns(): void {
    let tempCampaigns;
    this.campaignService.getCampaigns({ page: this.campaignsPageId })
      .pipe(
        tap((campaigns) => {
          if (campaigns.length < REQ_PAGE_SIZE) { // actual check here if no more campaigns then end -> ensure all pages combed
            this.campaignsEnded = true;
          }
        }),
        map((campaigns: ICampaign[]) => campaigns.filter((campaign) => campaign.type === CampaignType.stamp)),
        tap((campaigns: ICampaign[]) => {
          tempCampaigns = campaigns;
        }),
        switchMap(
          (campaigns: ICampaign[]) => {
            return combineLatest(...campaigns.map(campaign => {
              return this.stampService.getCards(campaign.id).pipe(
                catchError(() => of([]))
              );
            }));
          }
        ),
        map((stampCards: IStampCard[][]) => [].concat(...stampCards as []) as IStampCard[]),
      )
      .subscribe((stampCards: IStampCard[]) => {
        this.stampCards = stampCards;
        const filteredAndMacoronedCampaigns = tempCampaigns.filter(
          (campaign) => {
            const currentDate = new Date();
            const isComingSoon = campaign.beginsAt && campaign.beginsAt.getTime() > currentDate.getTime();
            return isComingSoon || ((stampCards.filter((stampCard) => stampCard.campaignId === campaign.id).length) > 0);
          }
        ).map((campaign) => {
          campaign.macaron = this.getCampaignMacaron(campaign);
          return campaign;
        });
        this.campaignsSubj.next(filteredAndMacoronedCampaigns);
        this.ghostCampaigns = [];
        this.cd.detectChanges();
      },
        () => {
          this.ghostCampaigns = [];
          this.cd.detectChanges();
        });
  }

  private initCampaignsScan(): void {
    this.campaigns$ = this.campaignsSubj.asObservable().pipe(
      scan((acc, curr) => [...acc, ...curr ? curr : []], [])
    );
  }

  public getCampaignMacaron(campaign: ICampaign): IMacaron | null {
    return this.macaronService.getCampaignMacaron(campaign);
  }

  public selected(campaign: ICampaignWithMacaron): void {
    if (campaign.macaron && campaign.macaron.class === 'coming-soon') {
      return;
    }
    this.tapped.emit(campaign.id);
  }

  public onScroll(): void {
    if (this.campaignsEnded) {
      return;
    }
    this.campaignsPageId++;
    this.loadCampaigns();
  }

}
