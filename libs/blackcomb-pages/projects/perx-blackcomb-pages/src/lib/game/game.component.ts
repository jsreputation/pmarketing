import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AuthenticationService,
  ErrorMessageService,
  GameType,
  IBadgeOutcome,
  ICampaign,
  ICampaignService,
  IEngagementTransaction,
  IFlags,
  IGame,
  IGameService,
  IPlayOutcome,
  IPointsOutcome,
  IPopupConfig,
  IPrePlayStateData,
  IPrizeSetOutcome,
  IRewardPopupConfig,
  NotificationService,
  RewardPopupComponent,
  SettingsService,
  Voucher
} from '@perxtech/core';
import { bufferCount, catchError, filter, first, map, switchMap, takeUntil, tap, } from 'rxjs/operators';
import { combineLatest, EMPTY, interval, Observable, Subject, throwError, } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { globalCacheBusterNotifier } from 'ngx-cacheable';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'perx-blackcomb-pages-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  public gameData$: Observable<IGame>;
  public gt: typeof GameType = GameType;
  private campaignId: number;
  private gameId: number;
  private transactionId: number;
  public progressValue: number;
  private destroy$: Subject<void> = new Subject();
  private popupData: IPopupConfig;
  private isAnonymousUser: boolean;
  private informationCollectionSetting: string;
  private rewardCount: string;
  private rewards: Voucher[];
  private points: IPointsOutcome;
  private badge: IBadgeOutcome;
  private isEmbedded: boolean;
  public willWin: boolean = false;
  public successPopUp: IPopupConfig = {
    title: 'GAME_PAGE.GAME_SUCCESS_TITLE',
    text: 'GAME_PAGE.GAME_SUCCESS_TEXT',
    buttonTxt: 'GAME_PAGE.VIEW_REWARD',
    imageUrl: 'assets/congrats_image.png',
    ctaButtonClass: 'ga_game_completion',
  };

  public noRewardsPopUp: IPopupConfig = {
    title: 'GAME_PAGE.GAME_NO_REWARDS_TITLE',
    text: 'GAME_PAGE.GAME_NO_REWARDS_TEXT',
    buttonTxt: 'GAME_PAGE.BACK_TO_WALLET',
    imageUrl: '',
    disableOverlayClose: true,
  };

  public gameNotAvailablePopUp: IPopupConfig = {
    title: 'GAME_PAGE.GAME_NOT_VALID',
    text: 'GAME_PAGE.GAME_NOT_VALID_TEXT',
    buttonTxt: 'GAME_PAGE.BACK_TO_WALLET',
    imageUrl: '',
    disableOverlayClose: true,
  };

  public outOfTriesPopup: IPopupConfig = {
    title: 'GAME_PAGE.OUT_OF_TRIES_TITLE',
    text: 'GAME_PAGE.OUT_OF_TRIES_TEXT',
    buttonTxt: 'GAME_PAGE.OUT_OF_TRIES_CTA',
    afterClosedCallBack: this,
    disableOverlayClose: true,
  };

  public rewardsTxt: string;
  public startGameAnimation: boolean = false;
  private prizeSetOutcome: IPrizeSetOutcome;
  private prizeSetReserved: boolean = false;
  public showPrizeSetOutcome: boolean = false;
  private prizeSetBtnTxt: string;
  public remoteFlags: IFlags;

  constructor(
    private route: ActivatedRoute,
    private gameService: IGameService,
    private router: Router,
    private notificationService: NotificationService,
    private auth: AuthenticationService,
    private translate: TranslateService,
    private campaignService: ICampaignService,
    private errorMessageService: ErrorMessageService,
    private dialog: MatDialog,
    private settingsService: SettingsService
  ) { }

  public ngOnInit(): void {
    this.initTranslate();

    this.settingsService.getRemoteFlagsSettings().subscribe((flags: IFlags) => {
      this.remoteFlags = flags;
      this.showPrizeSetOutcome = flags.showPrizeSetOutcome ? flags.showPrizeSetOutcome : false;
    });

    this.isAnonymousUser = this.auth.getAnonymous();
    combineLatest([
      this.route.queryParams,
      this.settingsService.getRemoteFlagsSettings()
    ]).subscribe(([params, flags]) => {
      const paramArr: string[] = params.flags && params.flags.split(',');
      this.isEmbedded = (paramArr && paramArr.includes('nonav')) || !!flags.disablePostGameNav;
    });
    this.popupData = this.noRewardsPopUp; // must pass data to notif,
    // see path to '[/wallet]' notif svc no popupData

    // @ts-ignore observable too long, linter cannot compute
    this.gameData$ = this.route.params.pipe(
      filter((params: Params) => params.id),
      map((params: Params) => params.id),
      map((id: string) => Number.parseInt(id, 10)),
      tap((id: number) => (this.campaignId = id)),
      switchMap((id: number) =>
        this.campaignService.getCampaign(id).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 403 || err.status === 404) {
              this.popupData = this.gameNotAvailablePopUp;
              this.redirectUrlAndPopUp();
            }
            throw err;
          })
        )
      ),
      switchMap((campaign: ICampaign) =>
        this.gameService.getGamesFromCampaign(campaign).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 403 || err.status === 404) {
              this.popupData = this.gameNotAvailablePopUp;
              this.redirectUrlAndPopUp();
            }
            throw err;
          })
        )
      ),
      first(),
      map((games: IGame[]) => {
        if (!games || !games.length) {
          this.popupData = this.gameNotAvailablePopUp;
          if(!this.isEmbedded) {
            this.redirectUrlAndPopUp();
          } else {
            this.gameNotAvailablePopUp.buttonTxt = null;
            this.gameNotAvailablePopUp.hideCloseButton = true;
            this.gameNotAvailablePopUp.disableOverlayClose = this.isEmbedded;
            this.notificationService.addPopup(this.gameNotAvailablePopUp);
          }
          return EMPTY;
        }
        return games;
      }),
      map((games: IGame[]) => games[0]),
      tap((game: IGame) => {
        if (game) {
          if (!game.texts.button) {
            this.translate
              .get('START_PLAYING')
              .subscribe((text) => (game.texts.button = text));
          }
          const { displayProperties } = game;
          this.gameId = game.id;
          if (
            displayProperties &&
            displayProperties.informationCollectionSetting
          ) {
            this.informationCollectionSetting =
              displayProperties.informationCollectionSetting;
          }

          const successOutcome = game.results.outcome;
          const noOutcome = game.results.noOutcome;
          if (noOutcome) {
            this.noRewardsPopUp.title = noOutcome.title;
            this.noRewardsPopUp.text = noOutcome.subTitle;
            this.noRewardsPopUp.imageUrl =
              noOutcome.image || this.noRewardsPopUp.imageUrl;
            this.noRewardsPopUp.hideCloseButton = this.isEmbedded;
            this.noRewardsPopUp.disableOverlayClose = this.isEmbedded;
            this.noRewardsPopUp.buttonTxt = this.isEmbedded
              ? null
              : noOutcome.button || this.noRewardsPopUp.buttonTxt;
          }
          if (successOutcome) {
            this.successPopUp.title = successOutcome.title;
            this.successPopUp.text = successOutcome.subTitle;
            this.successPopUp.imageUrl =
              successOutcome.image || this.successPopUp.imageUrl;
            this.successPopUp.hideCloseButton = this.isEmbedded;
            this.successPopUp.disableOverlayClose = this.isEmbedded;
            this.successPopUp.buttonTxt = this.isEmbedded
              ? null
              : successOutcome.button || this.successPopUp.buttonTxt;
          }
          if (
            // GLOB-29: Let scratch card tries error be handled by the game service
            game.type !== GameType.scratch &&
            game.type !== GameType.plinko &&
            game.remainingNumberOfTries <= 0 &&
            game.remainingNumberOfTries !== null
          ) {
            // null is recognised as infinite from dashboard
            this.outOfTriesPopup.buttonTxt = this.isEmbedded ? null : this.outOfTriesPopup.buttonTxt;
            this.outOfTriesPopup.hideCloseButton = this.isEmbedded;
            this.successPopUp.disableOverlayClose = this.isEmbedded;
            this.notificationService.addPopup(this.outOfTriesPopup);
          }
        }
      })
    );
  }

  public loadPreplay(): void {
    this.gameData$
      .pipe(
        switchMap((game: IGame) =>
          this.gameService.prePlay(game.id, this.campaignId)
        ),
        catchError((err) => throwError(err)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (gameTransaction: IEngagementTransaction) => {
          this.startGameAnimation = true;
          this.transactionId = gameTransaction.id;
          if (
            gameTransaction.voucherIds &&
            gameTransaction.voucherIds.length > 0
          ) {
            // set this as a property
            this.rewardCount = gameTransaction.voucherIds.length.toString();
          }
          if (gameTransaction.points) {
            this.points = gameTransaction.points[0];
          }
          if (gameTransaction.badges) {
            this.badge = gameTransaction.badges[0];
          }
          if (gameTransaction.prizeSets && gameTransaction.prizeSets.length > 0) {
            this.prizeSetReserved = true;
          }
          this.checkFailureOrSuccess();
        },
        (err: { errorState: string } | HttpErrorResponse) => {
          if (!(err instanceof HttpErrorResponse) && err.errorState) {
            this.popupData = {
              title: 'Sorry!',
              text: err.errorState,
              buttonTxt: this.isEmbedded ? null : this.gameNotAvailablePopUp.buttonTxt,
              imageUrl: '',
            };
          } else if (
            err instanceof HttpErrorResponse) {
            if (err.error) {
              this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message, err.status)
                .subscribe((errorMessage) => {
                  this.popupData = {
                    title: 'Sorry!',
                    text: errorMessage,
                    buttonTxt: this.isEmbedded ? null : this.gameNotAvailablePopUp.buttonTxt,
                    imageUrl: '',
                  };
                });
            }
          } else {
            this.popupData = this.noRewardsPopUp;
          }
          this.redirectUrlAndPopUp(); // wont call preplayConfirm direct away if preplay fail
        }
      );
  }

  public loadPlay(): void {
    this.gameService.play(this.gameId).subscribe(
      (gameOutcome: IPlayOutcome) => {
        this.startGameAnimation = true;
        if (gameOutcome.vouchers && gameOutcome.vouchers.length > 0) {
          // set this as a property
          this.rewardCount = gameOutcome.vouchers.length.toString();
        }
        if (gameOutcome && gameOutcome.points && gameOutcome.points.length) {
          this.points = gameOutcome.points[0];
        }
        if (this.showPrizeSetOutcome && gameOutcome.prizeSets && gameOutcome.prizeSets.length > 0) {
          this.prizeSetOutcome = gameOutcome.prizeSets[0];
        }
        this.checkFailureOrSuccess();
      },
      (response: HttpErrorResponse) => {
        this.errorMessageService.getErrorMessageByErrorCode(response.error.code, response.error.message)
          .subscribe(this.notificationService.addSnack);
      }
    );
  }

  public gameCompletedLoad(): void {
    const delay = 3000;
    const nbSteps = 60;
    const processBar$ = interval(delay / nbSteps).pipe(
      tap((v) => (this.progressValue = (v * 100) / nbSteps)),
      bufferCount(nbSteps),
      first()
    );
    processBar$.subscribe(
      () => this.redirectUrlAndPopUp(),
      () => this.redirectUrlAndPopUp()
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // mutates willWin property, succespopup text and popup data
  // @ts-ignore
  private fillSuccess(rewardCount?: string, pointsOutcome?: IPointsOutcome): void {
    this.willWin = true;

    // if win and popup data is not changed, popup will wrongly show game lost
    this.popupData = this.successPopUp;
    /*  todo:
     *    1. block is commented out because popup content is managed by dashboard.
     */
    if (rewardCount && parseInt(rewardCount, 10) > 0) {
      // this.successPopUp.text += this.rewardsTxt.replace(
      //   '{{rewards}}',
      //   rewardCount
      // );

      // append reward name to end of message
      if (this.remoteFlags.appendRewardName) {
        if (this.rewards.length === 1) {
          this.successPopUp.text += this.rewards[0].reward ? `\n${this.rewards[0].reward.name}` : '';
        } else if (this.rewards.length > 1) {
          this.successPopUp.text! += `\n${this.rewards
              .map(item => item.reward?.name)
              .join()}`;
        }
      }
    }
    // if (pointsOutcome) {
    //   if (pointsOutcome.points === 1) {
    //     this.translate
    //       .get('GAME_PAGE.GAME_SUCCESS_TEXT_POINT')
    //       .subscribe((text) => {
    //         this.successPopUp.text += `\n ${text}`;
    //         this.popupData = this.successPopUp;
    //       });
    //   } else {
    //     this.translate
    //       .get('GAME_PAGE.GAME_SUCCESS_TEXT_POINTS')
    //       .subscribe((text) => {
    //         this.successPopUp.text += `\n ${text.replace(
    //           '{{points}}',
    //           pointsOutcome.points.toString()
    //         )}`;
    //         this.popupData = this.successPopUp;
    //       });
    //   }
    // }
  }

  private fillFailure(): void {
    this.willWin = false;
    this.popupData = this.noRewardsPopUp;
  }

  private checkFailureOrSuccess(): void {
    if (this.rewardCount || this.points || this.badge || (this.showPrizeSetOutcome && (this.prizeSetOutcome || this.prizeSetReserved))) {
      this.fillSuccess(this.rewardCount, this.points);
    } else {
      this.fillFailure();
    }
  }

  public gameCompleted(): void {
    const gameOutcome$ = this.gameService.play(this.gameId).pipe(
      tap((gameOutcome: IPlayOutcome) => {
        if (gameOutcome && gameOutcome.vouchers && gameOutcome.vouchers.length > 0) {
          // set this as a property
          this.rewardCount = gameOutcome.vouchers.length.toString();
          this.rewards = gameOutcome.vouchers;
        }
        if (gameOutcome && gameOutcome.points && gameOutcome.points.length) {
          this.points = gameOutcome.points[0];
        }

        if (gameOutcome && gameOutcome.badges?.length) {
          this.badge = gameOutcome.badges[0];
        }
        if (this.showPrizeSetOutcome && gameOutcome && gameOutcome.prizeSets && gameOutcome.prizeSets.length > 0) {
          this.prizeSetOutcome = gameOutcome.prizeSets[0];
        }
        this.checkFailureOrSuccess();
      }),
      catchError((err: { errorState: string } | HttpErrorResponse) => {
        if (!(err instanceof HttpErrorResponse) && err.errorState) {
          this.popupData = {
            title: 'Sorry!',
            text: err.errorState,
            buttonTxt: this.isEmbedded ? null : this.gameNotAvailablePopUp.buttonTxt,
            imageUrl: '',
          };
        } else if (
          err instanceof HttpErrorResponse) {
          if (err.error) {
            this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message, err.status)
              .subscribe((errorMessage) => {
                this.popupData = {
                  title: 'Sorry!',
                  text: errorMessage,
                  buttonTxt: this.isEmbedded ? null : this.gameNotAvailablePopUp.buttonTxt,
                  imageUrl: '',
                };
              });
          }
        } else {
          this.popupData = this.noRewardsPopUp;
        }
        throw err;
      })
    );
    // display a loader before redirecting to next page
    const delay = 3000;
    const nbSteps = 60;
    const processBar$ = interval(delay / nbSteps).pipe(
      tap((v) => (this.progressValue = (v * 100) / nbSteps)),
      bufferCount(nbSteps),
      first()
    );
    combineLatest(processBar$, gameOutcome$).subscribe(
      () => this.redirectUrlAndPopUp(),
      () => this.redirectUrlAndPopUp()
    );
  }

  public preplayGameCompleted(): void {
    const userAction$: Observable<
      IEngagementTransaction | IPlayOutcome
    > = this.gameService
      .prePlayConfirm(this.transactionId, this.informationCollectionSetting)
      .pipe(
        tap((response: IEngagementTransaction | IPlayOutcome) => {
          if (this.isIEngagementTrascation(response)) {
            const gameTransaction = response as IEngagementTransaction;
            if (
              gameTransaction.voucherIds &&
              gameTransaction.voucherIds.length > 0
            ) {
              // set this as a property
              this.rewardCount = gameTransaction.voucherIds.length.toString();
            }
            if (gameTransaction.points) {
              this.points = gameTransaction.points[0];
            }
            if (this.showPrizeSetOutcome && gameTransaction.prizeSets && gameTransaction.prizeSets.length > 0) {
              this.prizeSetOutcome = gameTransaction.prizeSets[0];
            }
          } else if (this.isIPlayOutcome(response)) {
            const vouchers = response.vouchers;
            if (vouchers && vouchers.length > 0) {
              this.rewardCount = vouchers.length.toString();
            }
            if (response.points) {
              this.points = response.points[0];
            }
            if (this.showPrizeSetOutcome && response.prizeSets && response.prizeSets.length > 0) {
              this.prizeSetOutcome = response.prizeSets[0];
            }
          }
        }),
        catchError((err: { errorState: string } | HttpErrorResponse) => {
          if (!(err instanceof HttpErrorResponse) && err.errorState) {
            this.popupData = {
              title: 'Sorry!',
              text: err.errorState,
              buttonTxt: this.isEmbedded ? null : this.gameNotAvailablePopUp.buttonTxt,
              imageUrl: '',
            };
          }  else if (
            err instanceof HttpErrorResponse) {
            if (err.error) {
              this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message, err.status)
                .subscribe((errorMessage) => {
                  this.popupData = {
                    title: 'Sorry!',
                    text: errorMessage,
                    buttonTxt: this.isEmbedded ? null : this.gameNotAvailablePopUp.buttonTxt,
                    imageUrl: '',
                  };
                });
            }
          } else {
            this.popupData = this.noRewardsPopUp;
          }
          throw err;
        })
      );

    // display a loader before redirecting to next page
    const delay = 2000;
    const nbSteps = 60;
    const processBar$ = interval(delay / nbSteps).pipe(
      tap((v) => (this.progressValue = (v * 100) / nbSteps)),
      bufferCount(nbSteps),
      first()
    );
    combineLatest(processBar$, userAction$).subscribe(
      () => this.redirectUrlAndPopUp(),
      () => this.redirectUrlAndPopUp()
    );
  }

  private isIEngagementTrascation(
    object: any
  ): object is IEngagementTransaction {
    return 'voucherIds' in object || 'points' in object || 'prizeSet' in object;
  }
  private isIPlayOutcome(object: any): object is IPlayOutcome {
    return 'vouchers' in object || 'points' in object || 'prizeSet' in object;
  }

  public redirectUrlAndPopUp(): void {
    globalCacheBusterNotifier.next();
    const state: IPrePlayStateData = {
      popupData: this.popupData,
      engagementType: 'game',
      transactionId: this.transactionId,
      collectInfo: true,
    };
    if (!this.isEmbedded) {
      if (
        this.isAnonymousUser &&
        this.informationCollectionSetting === 'pi_required'
      ) {
        this.router.navigate(['/pi'], { state });
      } else if (
        this.isAnonymousUser &&
        this.informationCollectionSetting === 'signup_required'
      ) {
        this.router.navigate(['/signup'], { state });
      } else if (this.showPrizeSetOutcome && this.prizeSetOutcome) {
        const data: IRewardPopupConfig = this.popupData;
        data.buttonTxt = this.prizeSetBtnTxt,
          data.url = `/prize-set-outcomes/${this.prizeSetOutcome.prizeSetId}?transactionId=${this.prizeSetOutcome.transactionId}`;
        data.afterClosedCallBackRedirect = this;
        data.disableOverlayClose = true;
        data.showCloseBtn = false;
        this.dialog.open(RewardPopupComponent, { data });
      } else {
        // navigate to badge list if user has won a badge, since badges are not added to the wallet
        if (this.willWin && this.badge) {
          this.router.navigate(['/badges'], { queryParams: { filter: 'earned' } });
        } if (this.points) {
          this.router.navigate(['/transaction-history']);
        } else {
          this.router.navigate(['/wallet']);
        }
        this.notificationService.addPopup(this.popupData);
      }
    } else {
      this.notificationService.addPopup(this.popupData);
    }
  }

  private initTranslate(): void {
    if (this.successPopUp.title) {
      this.translate
        .get(this.successPopUp.title)
        .subscribe((text) => (this.successPopUp.title = text));
    }
    if (this.successPopUp.text) {
      this.translate
        .get(this.successPopUp.text)
        .subscribe((text) => (this.successPopUp.text = text));
    }
    if (this.successPopUp.buttonTxt) {
      this.translate
        .get(this.successPopUp.buttonTxt)
        .subscribe((text) => (this.successPopUp.buttonTxt = text));
    }
    if (this.noRewardsPopUp.title) {
      this.translate
        .get(this.noRewardsPopUp.title)
        .subscribe((text) => (this.noRewardsPopUp.title = text));
    }
    if (this.noRewardsPopUp.text) {
      this.translate
        .get(this.noRewardsPopUp.text)
        .subscribe((text) => (this.noRewardsPopUp.text = text));
    }
    if (this.noRewardsPopUp.buttonTxt) {
      this.translate
        .get(this.noRewardsPopUp.buttonTxt)
        .subscribe((text) => (this.noRewardsPopUp.buttonTxt = text));
    }
    if (this.gameNotAvailablePopUp.title) {
      this.translate
        .get(this.gameNotAvailablePopUp.title)
        .subscribe((text) => (this.gameNotAvailablePopUp.title = text));
    }
    if (this.gameNotAvailablePopUp.text) {
      this.translate
        .get(this.gameNotAvailablePopUp.text)
        .subscribe((text) => (this.gameNotAvailablePopUp.text = text));
    }
    if (this.gameNotAvailablePopUp.buttonTxt) {
      this.translate
        .get(this.gameNotAvailablePopUp.buttonTxt)
        .subscribe((text) => (this.gameNotAvailablePopUp.buttonTxt = text));
    }
    if (this.outOfTriesPopup.title) {
      this.translate
        .get(this.outOfTriesPopup.title)
        .subscribe((text) => (this.outOfTriesPopup.title = text));
    }
    if (this.outOfTriesPopup.text) {
      this.translate
        .get(this.outOfTriesPopup.text)
        .subscribe((text) => (this.outOfTriesPopup.text = text));
    }

    if (!this.isEmbedded && this.outOfTriesPopup.buttonTxt) {
      this.translate
        .get(this.outOfTriesPopup.buttonTxt)
        .subscribe((text) => (this.outOfTriesPopup.buttonTxt = text));
    }

    this.translate
      .get('GAME_PAGE.GAME_SUCCESS_TEXT_REWARDS')
      .subscribe((text) => (this.rewardsTxt = text));

    this.translate
      .get('PRIZE_SET.OUTCOME_SUCCESS_TITLE')
      .subscribe((text) => (this.prizeSetBtnTxt = text));

    if (this.isEmbedded) {
      this.successPopUp.buttonTxt = null;
      this.noRewardsPopUp.buttonTxt = null;
      this.outOfTriesPopup.buttonTxt = null;
    }
  }

  public dialogClosed(): void {
    if (!this.isEmbedded) {
      this.router.navigate([ '/home' ]);
    }
  }

  public closeAndRedirect(url: string): void {
    this.router.navigateByUrl(url);
  }
}
