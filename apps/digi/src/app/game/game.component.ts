import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService, CAMPAIGN_TYPE, IGame, GameService } from '@perx/core/dist/perx-core';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: IGame;

  gameId: number;

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

  onTap($event) {
    if ($event.tap >= this.numberOfTaps) {
      setTimeout(() => {
        this.router.navigate(['/congrats']);
      }, 3000);
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.gameId = Number.parseInt(params.get('id'), 10);
      if (!this.gameId) {
        this.campaignService.getCampaigns()
          .pipe(
            map(data => data.data),
            map(campaigns => campaigns.filter(camp => camp.campaign_type === CAMPAIGN_TYPE.game)),
            take(1)
          )
          .subscribe(campaigns => {
            if (campaigns && campaigns.length > 0) {
              this.gameService.getGamesFromCampaign(campaigns[0].id)
                .pipe(
                  take(1)
                )
                .subscribe((games: IGame[]) => {
                  if (games && games.length > 0) {
                    this.game = games[0];
                  }
                });
            }
          });

        return;
      }

      this.gameService.get(this.gameId)
        .pipe(take(1))
        .subscribe((game: IGame) => {
          this.game = game;
        });
    });
  }
}
