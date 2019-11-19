import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ICampaign, CampaignType, ICampaignService, IGameService, IGame } from '@perx/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { IMacaron, MacaronService } from '../../services/macaron.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  public campaigns: ICampaign[];
  public games: IGame[];

  @Output()
  public tapped: EventEmitter<number> = new EventEmitter();

  constructor(
    private campaignService: ICampaignService,
    private gameService: IGameService,
    private macaronService: MacaronService,
  ) { }

  public ngOnInit(): void {

    this.campaignService.getCampaigns().pipe(
      map((campaigns: ICampaign[]) => campaigns.filter((campaign) => campaign.type === CampaignType.game)),
      tap((campaigns: ICampaign[]) => this.campaigns = campaigns),
      switchMap(
        (campaigns: ICampaign[]) => combineLatest(...campaigns.map(campaign => this.gameService.getGamesFromCampaign(campaign.id)))
      ),
      map((games: IGame[][]) => games.reduce((gamesLine, acc) => acc.concat(gamesLine)))
    )
      .subscribe((games: IGame[]) => {
        this.games = games;
        this.campaigns = this.campaigns.filter(
          (campaign) => {
            return campaign.isComingSoon || ((games.filter((game) => game.campaignId === campaign.id).length) > 0);
          }
        );
      });
  }

  public selected(campaign: ICampaign): void {
    const gameWithCampaign = this.games.find((game) => game.campaignId === campaign.id);

    if (gameWithCampaign) {
      this.tapped.emit(gameWithCampaign.id);
    }
  }

  public getCampaignMacaron(campaign: ICampaign): IMacaron | null {
    return this.macaronService.getCampaignMacaron(campaign);
  }

}
