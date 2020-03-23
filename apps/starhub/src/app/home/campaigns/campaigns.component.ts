import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ICampaign, CampaignType, ICampaignService, IGameService, IGame, ConfigService } from '@perxtech/core';
import { map, scan, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { IMacaron, MacaronService } from '../../services/macaron.service';

const REQ_PAGE_SIZE: number = 10;

interface ICampaignWithMacaron extends ICampaign {
  macaron?: IMacaron | null;
}
@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})

export class CampaignsComponent implements OnInit {
  public campaigns$: Observable<ICampaignWithMacaron[]>;
  public campaignsSubj: BehaviorSubject<ICampaignWithMacaron[]> = new BehaviorSubject<ICampaignWithMacaron[]>([]);
  public games: IGame[];
  public campaignsPageId: number = 1;
  public campaignsEnded: boolean = false;

  @Output()
  public tapped: EventEmitter<number> = new EventEmitter();

  constructor(
    private campaignService: ICampaignService,
    private gameService: IGameService,
    private macaronService: MacaronService,
    private configService: ConfigService,
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
        map((campaigns: ICampaign[]) => campaigns.filter((campaign) => campaign.type === CampaignType.game)),
        tap((campaigns: ICampaign[]) => {
          tempCampaigns = campaigns;
        }),
        switchMap(
          (campaigns: ICampaign[]) => combineLatest(...campaigns.map(campaign => this.gameService.getGamesFromCampaign(campaign.id)))
        ),
        map((games: IGame[][]) => [].concat(...games as []) as IGame[])
      )
      .subscribe((games: IGame[]) => {
        this.games = games;
        const filteredAndMacoronedCampaigns = tempCampaigns.filter(
          (campaign) => {
            const currentDate = new Date();
            const isComingSoon = campaign.beginsAt && campaign.beginsAt.getTime() > currentDate.getTime();
            return isComingSoon || ((games.filter((game) => game.campaignId === campaign.id).length) > 0);
          }
        ).map((campaign) => {
          campaign.macaron = this.getCampaignMacaron(campaign);
          return campaign;
        });
        this.campaignsSubj.next(filteredAndMacoronedCampaigns);
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
    const gameWithCampaign = this.games.find((game) => game.campaignId === campaign.id);

    if (gameWithCampaign) {
      this.tapped.emit(gameWithCampaign.id);
    }
  }

  public onScroll(): void {
    if (this.campaignsEnded) {
      return;
    }
    this.campaignsPageId++;
    this.loadCampaigns();
  }

}
