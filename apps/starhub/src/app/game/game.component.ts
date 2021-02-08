import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ConfigService,
  IEngagementTransaction,
  IGame,
  IGameService,
  ICampaignService,
  ICampaign,
  IPlayOutcome,
  NotificationService,
  Voucher,
  GameType
} from '@perxtech/core';
import {
  catchError,
  map,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import { AnalyticsService, PageType } from '../analytics.service';
import { GameOutcomeService } from '../congrats/game-outcome/game-outcome.service';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageService } from '../utils/error-message/error-message.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public numberOfTaps: number | null;
  public title: string;
  public gameData$: Observable<IGame>;
  public game: IGame;
  public gameTransaction: IEngagementTransaction;
  private destroy$: Subject<void> = new Subject();
  public willWin: boolean = false;
  private hasNoRewardsPopup: boolean = false;
  public startGameAnimation: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private gameService: IGameService,
    private notificationService: NotificationService,
    private router: Router,
    private analytics: AnalyticsService,
    private gameOutcomeService: GameOutcomeService,
    private configService: ConfigService,
    private campaignService: ICampaignService,
    private errorMessageServce: ErrorMessageService
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
          return this.gameService.get(id);
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
          this.notificationService.addPopup({
            title: game.results.noOutcome && game.results.noOutcome.title,
            text: game.results.noOutcome && game.results.noOutcome.subTitle,
            buttonTxt: game.results.noOutcome && game.results.noOutcome.button,
            afterClosedCallBack: this,
            disableOverlayClose: true,
            panelClass: 'custom-class'
          });
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
    if (
      this.game &&
      (this.game.remainingNumberOfTries > 0 ||
        this.game.remainingNumberOfTries === null)
    ) {
      this.gameData$
        .pipe(
          switchMap((game) => this.gameService.prePlay(game.id)),
          catchError((err) => throwError(err)),
          takeUntil(this.destroy$)
        )
        .subscribe(
          (gameTransaction: IEngagementTransaction) => {
            this.gameTransaction = gameTransaction;
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
              this.errorMessageServce.getErrorMessageByErrorCode(err.error.code)
                .subscribe((message) => {
                  this.notificationService.addPopup({
                    title: 'Sorry!',
                    text: message,
                    disableOverlayClose: true,
                    panelClass: 'custom-class'
                  });
                });
            } else {
              this.showErrorPopup();
            }
          }
        );
    }
  }

  public preplayGameCompleted(): void {
    this.gameService
      .prePlayConfirm(this.gameTransaction.id)
      .pipe(map((game: IPlayOutcome) => game.vouchers))
      .subscribe(
        (vouchs: Voucher[]) => {
          this.gameCompletedHandler(vouchs);
        },
        () => this.showNoRewardsPopUp()
      );
  }

  public dialogClosed(): void {
    this.router.navigate(['/home']);
  }

  public gameCompleted(): void {
    this.gameService
      .play(this.game.id)
      .pipe(map((game: IPlayOutcome) => game.vouchers))
      .subscribe(
        (vouchs: Voucher[]) => {
          this.gameCompletedHandler(vouchs);
        },
        () => this.showNoRewardsPopUp()
      );
  }

  private gameCompletedHandler(vouchs: Voucher[], withRedirectAndPopup: boolean = true): void {
    if ((window as any).appboy) {
      (window as any).appboy.logCustomEvent('user_played_game', {
        game_id: this.game.id,
        campaign_id: this.game.campaignId
      });
    }
    if (!vouchs || vouchs.length === 0) {
      // This params is specially for spin the wheel, load play first process
      this.hasNoRewardsPopup = true;
      if (withRedirectAndPopup) {
        this.showNoRewardsPopUp();
      }
    } else {
      this.gameOutcomeService.setVouchersList(vouchs);
      if (this.game.results && this.game.results.outcome) {
        this.gameOutcomeService.setOutcome(this.game.results.outcome);
      }
      if (withRedirectAndPopup) {
        this.router.navigate(['/congrats']);
      }
    }
  }

  public loadPlay(): void {
    this.gameService.play(this.game.id)
      .pipe(
        map((game: IPlayOutcome) => game.vouchers)
      ).subscribe(
        (vouchs: Voucher[]) => {
          this.startGameAnimation = true;
          if (vouchs && vouchs.length > 0) {
            this.hasNoRewardsPopup = false;
            this.willWin = true;
            this.gameCompletedHandler(vouchs, false);
          } else {
            // For spin game with no outcome option
            this.willWin = false;
            this.hasNoRewardsPopup = true;
          }
        },
        (response: HttpErrorResponse) => {
          this.errorMessageServce.getErrorMessageByErrorCode(response.error.code)
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
