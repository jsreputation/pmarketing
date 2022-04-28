import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ConfigService,
  GameType,
  ICampaign,
  ICampaignService,
  IEngagementTransaction,
  IGame,
  IGameService,
  IPlayOutcome,
  NotificationService,
  PopUpClosedCallBack
} from '@perxtech/core';
import { catchError, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AnalyticsService, PageType } from '../analytics.service';
import { GameOutcomeService } from '../congrats/game-outcome/game-outcome.service';
import { iif, Observable, of, Subject, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageService } from '../utils/error-message/error-message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, PopUpClosedCallBack {
  public numberOfTaps: number | null;
  public title: string;
  public gameData$: Observable<IGame>;
  public game: IGame;
  public gameTransaction: IEngagementTransaction;
  private destroy$: Subject<void> = new Subject();
  public willWin: boolean = false;
  private hasNoRewardsPopup: boolean = false;
  public startGameAnimation: boolean = false;
  private isGameTransactionSet: Observable<boolean> = of(false);

  constructor(
    private activeRoute: ActivatedRoute,
    private gameService: IGameService,
    private notificationService: NotificationService,
    private router: Router,
    private analytics: AnalyticsService,
    private gameOutcomeService: GameOutcomeService,
    private configService: ConfigService,
    private campaignService: ICampaignService,
    private errorMessageServce: ErrorMessageService,
    private translateService: TranslateService
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(() => {
      this.gameData$ = this.loadGame();
    });
  }

  public loadGame(): Observable<IGame> {
    return this.activeRoute.queryParams.pipe(
      switchMap((params: Params) => {
        if (params.id) {
          const id = parseInt(params.id, 10);
          return this.gameService.get(id).pipe(
            switchMap((game: IGame) => {
              if (game.campaignId) {
                 return this.campaignService.getCampaign(game.campaignId).pipe(
                  map((campaign: ICampaign) => {
                    game.operatingHours = campaign?.operatingHours;
                    game.isOperating = campaign?.isOperating;
                    return game;
                  }));
              }
              return of(game);
            }));
        }

        const cid = parseInt(params.cid, 10);
        return this.campaignService.getCampaign(cid).pipe(
          switchMap((campaign: ICampaign) => this.gameService.getGamesFromCampaign(campaign)),
          take(1),
          map((games: IGame[]) => games[0])
        );
      }),
      tap((game: IGame) => {
        if (!game) {
          this.showErrorPopup();
          return;
        }
        this.game = game;
        this.title = game.texts.title || 'Shake the Pinata';
        if (game.config && 'nbTaps' in game.config) {
          this.numberOfTaps = game.config && game.config.nbTaps;
        }
        if (
          // GLOB-29: Let scratch card tries error be handled by the game service
          game.type !== GameType.scratch &&
          game.remainingNumberOfTries !== null &&
          game.remainingNumberOfTries <= 0
        ) {
            this.translateService.get([ 'ERRORS.OUT_OF_TRIES_TITLE', 'ERRORS.OUT_OF_TRIES_TEXT', 'ERRORS.OUT_OF_TRIES_CTA' ]).subscribe(
              (dictionary) => {
                this.notificationService.addPopup({
                  title: dictionary['ERRORS.OUT_OF_TRIES_TITLE'],
                  text: dictionary['ERRORS.OUT_OF_TRIES_TEXT'],
                  buttonTxt: dictionary['ERRORS.OUT_OF_TRIES_CTA'],
                  afterClosedCallBack: this,
                  disableOverlayClose: true,
                  panelClass: 'custom-class'
                });
              }
            );
        }

        if ((window as any).appboy) {
          (window as any).appboy.logCustomEvent('user_view_game', {
            game_id: this.game.id,
            campaign_id: this.game.campaignId
          });
        }
        this.analytics.addEvent({
          pageName: `rewards:game:${this.title}`,
          pageType: PageType.static,
          siteSectionLevel2: 'rewards:game',
          siteSectionLevel3: 'rewards:game'
        });
      }),
      catchError((err: HttpErrorResponse) => {
        this.showErrorPopup();
        throw err;
      }),
      takeUntil(this.destroy$)
    );
  }

  private showErrorPopup(): void {
    this.notificationService.addPopup({
      title: 'Sorry!',
      text: 'Something is wrong, game cannot be played at the moment!',
      disableOverlayClose: true,
      panelClass: 'custom-class'
    });
  }

  public loadPreplay(): void {
    this.gameData$
      .pipe(
        switchMap((game) => this.gameService.prePlay(game.id)),
        catchError((err) => throwError(err)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (gameTransaction: IEngagementTransaction) => {
          this.gameTransaction = gameTransaction;
          this.isGameTransactionSet = of(true);
          this.startGameAnimation = true;
          if (
            gameTransaction.voucherIds &&
            gameTransaction.voucherIds.length > 0
          ) {
            // set this as a property
            if (this.game.results && this.game.results.outcome) {
              this.gameOutcomeService.setOutcome(this.game.results.outcome);
              this.willWin = true;
            }
          } else {
            this.willWin = false;
          }
        },
        (err: { errorState: string } | HttpErrorResponse) => {
          if (err instanceof HttpErrorResponse) {
            this.errorMessageServce.getErrorMessageByErrorCode(err.error.code, err.error.message)
              .subscribe((message) => {
                this.notificationService.addPopup({
                  title: 'Sorry!',
                  text: message,
                  disableOverlayClose: true,
                  panelClass: 'custom-class',
                  afterClosedCallBack: this
                });
              });
          } else {
            this.showErrorPopup();
          }
        }
      );
  }

  public preplayGameCompleted(): void {
    // STAR-446: sometimes preplayGameCompleted is called before gameTransaction is set
    // check if gameTransaction is available
    iif(() => this.gameTransaction && this.gameTransaction.id !== null,
      of({}),
      this.isGameTransactionSet
        .pipe(takeUntil(this.destroy$)) // if gameTransaction is unavailable, start wating for it to be set
    ).subscribe(() => this.confirmPrePlay());
  }

  private confirmPrePlay(): void {
    this.gameService
      .prePlayConfirm(this.gameTransaction.id)
      .subscribe(
        (outcome: IPlayOutcome) => {
          this.gameCompletedHandler(outcome);
        },
        () => this.showNoRewardsPopUp()
      );
  }

  public dialogClosed(): void {
    this.router.navigate(['/home']);
  }

  public closeAndRedirect(): void {
    this.router.navigate(['/home']);
  }

  public gameCompleted(): void {
    this.gameService
      .play(this.game.id)
      .subscribe(
        (outcome: IPlayOutcome) => {
          this.gameCompletedHandler(outcome);
        },
        () => this.showNoRewardsPopUp()
      );
  }

  private gameCompletedHandler(gameOutcome: IPlayOutcome, withRedirectAndPopup: boolean = true): void {
    if ((window as any).appboy) {
      (window as any).appboy.logCustomEvent('user_played_game', {
        game_id: this.game.id,
        campaign_id: this.game.campaignId
      });
    }
    if (gameOutcome && gameOutcome.vouchers && gameOutcome.vouchers.length > 0) {
      // set this as a property
      this.gameOutcomeService.setVouchersList(gameOutcome.vouchers);
      if (this.game.results && this.game.results.outcome) {
        this.gameOutcomeService.setOutcome(this.game.results.outcome);
      }
      if (withRedirectAndPopup) {
        this.router.navigate(['/congrats']);
      }
    }
    if (gameOutcome && gameOutcome.prizeSets && gameOutcome.prizeSets.length > 0) {
      this.gameOutcomeService.setPrizeSetOutcome(gameOutcome.prizeSets[0]);
      if (this.game.results && this.game.results.outcome) {
        this.gameOutcomeService.setOutcome(this.game.results.outcome);
      }
      if (withRedirectAndPopup) {
        this.router.navigate(['/congrats']);
      }
    }
    if ((!gameOutcome.vouchers || gameOutcome.vouchers.length === 0) &&
      (!gameOutcome.points || gameOutcome.points.length === 0) &&
      (!gameOutcome.prizeSets || gameOutcome.prizeSets.length === 0)
    ) {
      // This params is specially for spin the wheel, load play first process
      this.hasNoRewardsPopup = true;
      if (withRedirectAndPopup) {
        this.showNoRewardsPopUp();
      }
    }
  }

  public loadPlay(): void {
    this.gameService.play(this.game.id)
      .pipe(
      ).subscribe(
        (outcome: IPlayOutcome) => {
          this.startGameAnimation = true;
          if (outcome && (outcome.vouchers?.length || outcome.points?.length || outcome.prizeSets?.length)) {
            this.hasNoRewardsPopup = false;
            this.willWin = true;
            this.gameCompletedHandler(outcome, false);
          } else {
            // For spin game with no outcome option
            this.willWin = false;
            this.hasNoRewardsPopup = true;
          }
        },
        (response: HttpErrorResponse) => {
          this.errorMessageServce.getErrorMessageByErrorCode(response.error.code, response.error.message)
            .subscribe((message) => {
              this.notificationService.addPopup({
                title: 'Sorry!',
                text: message,
                buttonTxt: 'back home',
                afterClosedCallBack: this,
                disableOverlayClose: true,
                panelClass: 'custom-class'
              });
            });
        }
      );
  }

  public playGameCompleted(): void {
    if (this.hasNoRewardsPopup) {
      this.showNoRewardsPopUp();
    } else {
      this.router.navigate(['/congrats']);
    }
  }

  private showNoRewardsPopUp(): void {
    this.notificationService.addPopup({
      title: this.game.results.noOutcome && this.game.results.noOutcome.title,
      text: this.game.results.noOutcome && this.game.results.noOutcome.subTitle,
      buttonTxt:
        this.game.results.noOutcome && this.game.results.noOutcome.button,
      afterClosedCallBack: this,
      disableOverlayClose: true,
      panelClass: 'custom-class'
    });
  }
}
