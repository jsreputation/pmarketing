// tslint:disable: rxjs-no-nested-subscribe
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  ICampaignService,
  CampaignType,
  IGame,
  IGameService,
  ICampaign,
  NotificationService,
  IGameOutcome,
  IGameComponent,
  PopUpClosedCallBack,
  IPlayOutcome,
} from '@perxtech/core';
import { map, take, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, PopUpClosedCallBack {
  public isEnabled: boolean = false;
  public title: string = 'Play the game and win!';
  public subTitle: string = 'Enjoy your reward.';
  public buttonTxt: string = 'Get started';
  public bgImgUrl: string = '';
  public disableBtn: boolean = true;

  private campaignId: number;
  private gameIns: IGame;
  private lastPayload: any;

  @ViewChild('tree', { static: false })
  private tree: IGameComponent | undefined;
  @ViewChild('pinata', { static: false })
  private pinata: IGameComponent | undefined;

  constructor(
    private route: ActivatedRoute,
    private campaignService: ICampaignService,
    private gameService: IGameService,
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
              map((campaigns: ICampaign[]) => campaigns.filter((camp: ICampaign) => camp.type === CampaignType.game)),
              map((campaigns: ICampaign[]) => campaigns[0])
            )
            .subscribe(
              (campaign: ICampaign | null) => {
                if (campaign !== undefined && campaign !== null) {
                  this.campaignId = campaign.id;
                  this.fetchGame();
                }
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
    if (game.backgroundImg) {
      this.bgImgUrl = game.backgroundImg;
    }
    if (game.texts.button) {
      this.buttonTxt = game.texts.button;
    }
    if (game.texts.title) {
      this.title = game.texts.title;
    }
    if (game.texts.subTitle) {
      this.subTitle = game.texts.subTitle;
    }
    if (game.remainingNumberOfTries > 0) {
      this.disableBtn = false;
    } else {
      this.notificationService.addPopup({
        title: 'No more tries',
        text: 'Come back when you have more tries!',
        buttonTxt: '',
        disableOverlayClose: true
      });
    }
  }

  private fetchGame(): void {
    this.campaignService.getCampaign(this.campaignId).pipe(
      switchMap((campaign: ICampaign) => this.gameService.getGamesFromCampaign(campaign)),
      take(1),
      map((games: IGame[]) => games[0])
    )
    .subscribe(
      (game: IGame) => this.game = game,
      (err: any) => {
        console.log(err);
        this.isEnabled = false;
        this.notificationService.addPopup({
          title: 'Oooops!',
          text: 'Something is wrong, game cannot be played at the moment!'
        });
      }
    );
  }

  public onComplete(): void {
    if (this.game !== undefined && this.game !== null) {
      this.gameService.play(this.game.id)
        .pipe(
          take(1)
        )
        .subscribe(
          (res: IPlayOutcome) => {
            // one try has been used
            this.game.remainingNumberOfTries--;
            // select proper popup based on outcome
            const hasOutcome: boolean = res.vouchers.length > 0;
            const outcome: IGameOutcome = hasOutcome ? this.game.results.outcome : this.game.results.noOutcome;
            this.lastPayload = hasOutcome ? res.rawPayload : undefined;
            if (this.game.remainingNumberOfTries === 0 && !hasOutcome) {
              outcome.button = null;
            }

            this.outcomePopup(outcome);
          },
          (e: HttpErrorResponse) => {
            if (e.status === 422) {
              const outcome: IGameOutcome = this.game.results.noOutcome;
              outcome.button = null;
              this.outcomePopup(outcome);
            } else if (e.status === 400) {
              const outcome: IGameOutcome = this.game.results.noOutcome;
              this.outcomePopup(outcome);
            } else {
              this.notificationService.addPopup({
                title: 'Oops',
                text: 'Something went very wrong, please try again later',
                buttonTxt: 'Try Again',
                disableOverlayClose: true,
                afterClosedCallBack: this
              });
            }
          }
        );
    }
  }

  public dialogClosed(): void {
    if (this.lastPayload) {
      const jsonString: string = JSON.stringify(this.lastPayload);
      const base64: string = btoa(jsonString);
      window.location.href = `https://success?payload=${base64}`;
    } else {
      this.reset();
    }
  }

  private outcomePopup(outcome: IGameOutcome): void {
    if (!outcome) {
      outcome = {
        title: 'Thanks for playing',
        subTitle: null,
        button: 'Play Again'
      };
    }
    this.notificationService.addPopup({
      title: outcome.title,
      text: outcome.subTitle,
      buttonTxt: outcome.button,
      imageUrl: outcome.image,
      afterClosedCallBack: this,
      disableOverlayClose: true
    });
  }

  private reset(): void {
    this.isEnabled = false;
    [this.tree, this.pinata].forEach((game: IGameComponent) => {
      if (game) {
        game.reset();
        if (this.game.remainingNumberOfTries === 0) {
          this.disableBtn = true;
          this.notificationService.addPopup({
            title: 'No more tries',
            text: 'Come back when you have more tries!',
            buttonTxt: null,
            disableOverlayClose: true
          });
        }
      }
    });
  }
}
