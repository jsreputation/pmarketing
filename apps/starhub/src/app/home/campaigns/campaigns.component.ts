import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ICampaign, CampaignType, ICampaignService, IGameService, IGame } from '@perx/core';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  public campaigns: ICampaign[];
  public games: IGame[];

  @Output()
  public tapped: EventEmitter<ICampaign> = new EventEmitter();

  constructor(
    private campaignService: ICampaignService,
    private gameService: IGameService
  ) {}

  public ngOnInit(): void {

    this.campaignService.getCampaigns().pipe(
        map((campaigns: ICampaign[]) => campaigns.filter((campaign) => campaign.type === CampaignType.game)),
        map((campaigns: ICampaign[]) => this.campaigns = campaigns),
        switchMap((campaigns: ICampaign[]) => combineLatest(...campaigns.map(campaign => this.gameService.getGamesFromCampaign(campaign.id)
          .pipe(map((games: IGame[]) => { if (games.length > 0) { return games[0]; }})))
          )))
        .subscribe((games: IGame[]) => {
          this.games = games;
          this.campaigns = this.campaigns.filter(
            (campaign) => {
              return ((games.filter((game) => game.campaignId === campaign.id).length) > 0);
            }
          );
      });
  }

  public selected(campaign: ICampaign): void {
    let gameId;
    this.games.forEach(
      (game) => {
        if (game.campaignId === campaign.id) {
          gameId = game.id;
        }
      }
    );

    if (gameId) {
      this.tapped.emit(gameId);
    }
  }
}
