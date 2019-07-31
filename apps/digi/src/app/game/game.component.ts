// tslint:disable: rxjs-no-nested-subscribe
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  CampaignService,
  CAMPAIGN_TYPE,
  IGame,
  GameService,
  ICampaign,
  NotificationService,
  IGameOutcome,
} from '@perx/core';
import { map, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public isEnabled: boolean = false;
  public title: string = 'Play the game and win!';
  public subTitle: string = 'Enjoy your reward.';
  public buttonTxt: string = 'Get started';

  private campaignId: number;
  private gameIns: IGame;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private gameService: GameService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const gameId: number = Number.parseInt(params.get('gameId'), 10);
      if (gameId) {
        this.gameService.get(gameId)
          .pipe(take(1))
          .subscribe(
            (game: IGame) => this.game = game,
            () => { }
          );
        return;
      }

      this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
        this.campaignId = Number.parseInt(queryParams.get('campaignId'), 10);
        if (!this.campaignId) {
          this.campaignService.getCampaigns()
            .pipe(
              take(1),
              map((campaigns: ICampaign[]) => campaigns.filter((camp: ICampaign) => camp.type === CAMPAIGN_TYPE.game)),
              map((campaigns: ICampaign[]) => campaigns[0])
            )
            .subscribe(
              (campaign: ICampaign) => {
                this.campaignId = campaign.id;
                this.fetchGame();
              },
              () => { }
            );

          return;
        }

        this.fetchGame();
      });
    });
  }

  public get game(): IGame {
    return this.gameIns;
  }

  public set game(game: IGame) {
    this.gameIns = game;
    if (game.texts.button) {
      this.buttonTxt = game.texts.button;
    }
    if (game.texts.title) {
      this.title = game.texts.title;
    }
    if (game.texts.subTitle) {
      this.subTitle = game.texts.subTitle;
    }
  }

  private fetchGame(): void {
    this.gameService.getGamesFromCampaign(this.campaignId)
      .pipe(
        // tap((games: IGame[]) => { console.log(games); }),
        take(1),
        map((games: IGame[]) => games[0])
      )
      .subscribe(
        (game: IGame) => this.game = game,
        (err: any) => {
          console.log(err);
          this.isEnabled = true;
          this.notificationService.addPopup({
            title: 'Oooops!',
            text: 'Something is wrong, game cannot be played at the moment!'
          });
        }
      );
  }

  public onComplete(): void {
    if (this.game) {
      this.gameService.play(this.game.id)
        .pipe(
          take(1)
        )
        .subscribe(
          (res: any) => {
            const hasOutcome: boolean = (res.data && res.data.outcomes && res.data.outcomes.length > 0);
            let outcome: IGameOutcome = hasOutcome ? this.game.results.outcome : this.game.results.noOutcome;
            if (!outcome) {
              outcome = {
                title: 'Thanks for playing',
                subTitle: null,
                button: 'ok'
              };
            }
            this.notificationService.addPopup({
              title: outcome.title,
              text: outcome.subTitle,
              buttonTxt: outcome.button,
              imageUrl: outcome.image
            });
          },
          (e: HttpErrorResponse) => {
            console.error(e);
            this.notificationService.addPopup({
              title: 'Oops',
              text: 'Something went very wrong, please try again later'
            });
          }
        );
    }
  }
}
