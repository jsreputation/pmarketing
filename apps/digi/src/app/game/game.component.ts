import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService, CAMPAIGN_TYPE, IGame, GameService, ICampaign } from '@perx/core/dist/perx-core';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: IGame;

  gameId: number;
  campaignId: number;

  isEnabled = false;
  title = 'Hit the Pinata and Win!';
  subTitle = 'Enjoy your Gold membership reward.';
  numberOfTaps = 5;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.gameId = Number.parseInt(params.get('gameId'), 10);
      if (this.gameId) {
        this.gameService.get(this.gameId)
          .pipe(take(1))
          .subscribe((game: IGame) => {
            this.game = game;
          });
        return;
      }

      this.route.queryParamMap.subscribe(queryParams => {
        this.campaignId = Number.parseInt(queryParams.get('campaignId'), 10);
        if (!this.campaignId) {
          this.campaignService.getCampaigns()
            .pipe(
              map((campaigns: ICampaign[]) => campaigns.filter(camp => camp.type === CAMPAIGN_TYPE.game)),
              take(1)
            )
            .subscribe(campaigns => {
              if (!campaigns || campaigns.length <= 0) {
                return;
              }

              this.campaignId = campaigns[0].id;
              this.gameService.getGamesFromCampaign(this.campaignId)
                .pipe(
                  take(1)
                )
                .subscribe((games: IGame[]) => {
                  if (games && games.length > 0) {
                    this.game = games[0];
                  }
                });
            });

          return;
        }

        this.gameService.getGamesFromCampaign(this.campaignId)
          .pipe(
            take(1)
          )
          .subscribe((games: IGame[]) => {
            if (games && games.length > 0) {
              this.game = games[0];
            }
          });
      });
    });
  }

  onComplete() {
    if (this.game) {
      this.gameService.play(this.game.id)
        .pipe(take(1))
        .subscribe(res => {
          if (res) {
            const payload = btoa(JSON.stringify(res));
            this.router.navigate([`/result`], { queryParams: { payload }});
          }
        });
    }
  }
}
