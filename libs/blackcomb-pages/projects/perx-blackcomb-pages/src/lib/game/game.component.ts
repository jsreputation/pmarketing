import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {
  IGameService,
  IGame,
  GameType,
  IPopupConfig,
  IEngagementTransaction,
  AuthenticationService,
  NotificationService,
  IPrePlayStateData,
} from '@perxtech/core';
import { map, tap, first, filter, switchMap, bufferCount, catchError, takeUntil } from 'rxjs/operators';
import { Observable, interval, throwError, Subject, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IPlayOutcome } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
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
  public willWin: boolean = false;
  public successPopUp: IPopupConfig = {
    title: 'GAME_SUCCESS_TITLE',
    text: 'GAME_SUCCESS_TEXT',
    buttonTxt: 'VIEW_REWARD',
    imageUrl: 'assets/congrats_image.png',
    ctaButtonClass: 'ga_game_completion'
  };

  public noRewardsPopUp: IPopupConfig = {
    title: 'GAME_NO_REWARDS_TITLE',
    text: 'GAME_NO_REWARDS_TEXT',
    buttonTxt: 'BACK_TO_WALLET',
    imageUrl: '',
  };

  public gameNotAvailablePopUp: IPopupConfig = {
    title: 'GAME_NOT_VALID',
    text: 'GAME_NOT_VALID_TEXT',
    buttonTxt: 'BACK_TO_WALLET',
    imageUrl: '',
  };

  constructor(
    private route: ActivatedRoute,
    private gameService: IGameService,
    private router: Router,
    private notificationService: NotificationService,
    private auth: AuthenticationService,
    private translate: TranslateService,
  ) {
  }

  public ngOnInit(): void {
    this.initTranslate();

    this.isAnonymousUser = this.auth.getAnonymous();
    this.gameData$ = this.route.params.pipe(
      filter((params: Params) => params.id),
      map((params: Params) => params.id),
      map((id: string) => Number.parseInt(id, 10)),
      tap((id: number) => this.campaignId = id),
      switchMap((id: number) => this.gameService.getGamesFromCampaign(id).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403 || err.status === 404) {
            this.popupData = this.gameNotAvailablePopUp;
            this.redirectUrlAndPopUp();
          }
          throw err;
        }))
      ),
      first(),
      tap((games: IGame[]) => !games || !games.length && this.router.navigate(['/wallet'])),
      map((games: IGame[]) => games[0]),
      tap((game: IGame) => {
        if (game) {
          if (!game.texts.button) {
            this.translate.get('START_PLAYING').subscribe((text) => game.texts.button = text);
          }
          const { displayProperties } = game;
          this.gameId = game.id;
          if (displayProperties && displayProperties.informationCollectionSetting) {
            this.informationCollectionSetting = displayProperties.informationCollectionSetting;
          }

          const successOutcome = game.results.outcome;
          const noOutcome = game.results.noOutcome;
          if (noOutcome) {
            this.noRewardsPopUp.title = noOutcome.title;
            this.noRewardsPopUp.text = noOutcome.subTitle;
            this.noRewardsPopUp.imageUrl = noOutcome.image || this.noRewardsPopUp.imageUrl;
            this.noRewardsPopUp.buttonTxt = noOutcome.button || this.noRewardsPopUp.buttonTxt;
          }
          if (successOutcome) {
            this.successPopUp.title = successOutcome.title;
            this.successPopUp.text = successOutcome.subTitle;
            this.successPopUp.imageUrl = successOutcome.image || this.successPopUp.imageUrl;
            this.successPopUp.buttonTxt = successOutcome.button || this.successPopUp.buttonTxt;
          }
          if (game.remainingNumberOfTries <= 0) {
            this.notificationService.addPopup({
              title: 'No more tries',
              text: 'Come back when you\'ve earned more tries!',
              buttonTxt: 'Close',
              afterClosedCallBack: this,
              disableOverlayClose: true
            });
          }
        }
      })
    );
  }

  public loadPreplay(): void {
    this.gameData$.pipe(
      switchMap(
        (game: IGame) => this.gameService.prePlay(game.id, this.campaignId)
      ),
      catchError(err => throwError(err)),
      takeUntil(this.destroy$)
    ).subscribe(
      (gameTransaction: IEngagementTransaction) => {
        this.transactionId = gameTransaction.id;
        if (gameTransaction.voucherIds && gameTransaction.voucherIds.length > 0) {
          // set this as a property
          this.rewardCount = gameTransaction.voucherIds.length.toString();
          this.fillSuccess(this.rewardCount);
        } else {
          this.fillFailure();
        }
      },
      (err: { errorState: string } | HttpErrorResponse) => {
        if (!(err instanceof HttpErrorResponse) && err.errorState) {
          this.popupData = {
            title: err.errorState,
            text: '',
            buttonTxt: 'BACK_TO_WALLET',
            imageUrl: '',
          };
        } else {
          this.popupData = this.noRewardsPopUp;
        }
        this.redirectUrlAndPopUp(); // wont call preplayConfirm direct away if preplay fail
      }
    );
  }

  public loadPlay(): void {
    this.gameService.play(
      this.gameId
    ).subscribe(
      (gameOutcome: IPlayOutcome) => {
        if (gameOutcome.vouchers.length > 0) {
          // set this as a property
          this.rewardCount = gameOutcome.vouchers.length.toString();
          this.fillSuccess(this.rewardCount);
        } else {
          this.fillFailure();
        }
      },
      () => {
        this.popupData = this.noRewardsPopUp;
        this.redirectUrlAndPopUp(); // wont call preplayConfirm direct away if preplay fail
      }
    );
  }

  public gameCompletedLoad(): void {
    const delay = 3000;
    const nbSteps = 60;
    const processBar$ = interval(delay / nbSteps)
      .pipe(
        tap(v => this.progressValue = v * 100 / nbSteps),
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
  private fillSuccess(rewardCount: string): void {
    this.willWin = true;
    this.successPopUp.text =
      this.successPopUp.text ? this.successPopUp.text.replace('{{rewards}}', rewardCount) : `You earned ${rewardCount} rewards`;
    this.popupData = this.successPopUp;
  }

  private fillFailure(): void {
    this.willWin = false;
    this.popupData = this.noRewardsPopUp;
  }

  public gameCompleted(): void {
    const gameOutcome$ = this.gameService.play(
      this.gameId
    ).pipe(
      tap((gameOutcome: IPlayOutcome) => {
        if (gameOutcome.vouchers.length > 0) {
          // set this as a property
          this.rewardCount = gameOutcome.vouchers.length.toString();
          this.fillSuccess(this.rewardCount);
        } else {
          this.fillFailure();
        }
      }),
      catchError((err: HttpErrorResponse) => {
        this.popupData = this.noRewardsPopUp;
        throw err;
      })
    );
    // display a loader before redirecting to next page
    const delay = 3000;
    const nbSteps = 60;
    const processBar$ = interval(delay / nbSteps)
      .pipe(
        tap(v => this.progressValue = v * 100 / nbSteps),
        bufferCount(nbSteps),
        first()
      );
    combineLatest(processBar$, gameOutcome$).subscribe(
      () => this.redirectUrlAndPopUp(),
      () => this.redirectUrlAndPopUp()
    );
  }

  public preplayGameCompleted(): void {
    const userAction$: Observable<IEngagementTransaction | IPlayOutcome> = this
      .gameService.prePlayConfirm(this.transactionId, this.informationCollectionSetting).pipe(
        tap((response: IEngagementTransaction | IPlayOutcome) => {
          if (this.isIEngagementTrascation(response)) {
            const gameTransaction = response as IEngagementTransaction;
            if (gameTransaction.voucherIds && gameTransaction.voucherIds.length > 0) {
              // set this as a property
              this.rewardCount = gameTransaction.voucherIds.length.toString();
              this.fillSuccess(this.rewardCount);
            } else {
              this.fillFailure();
            }
          } else if (this.isIPlayOutcome(response)) {
            const vouchers = response.vouchers;
            if (vouchers.length > 0) {
              this.rewardCount = vouchers.length.toString();
              this.fillSuccess(this.rewardCount);
            } else {
              this.fillFailure();
            }
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this.popupData = this.noRewardsPopUp;
          throw err;
        })
      );

    // display a loader before redirecting to next page
    const delay = 2000;
    const nbSteps = 60;
    const processBar$ = interval(delay / nbSteps)
      .pipe(
        tap(v => this.progressValue = v * 100 / nbSteps),
        bufferCount(nbSteps),
        first()
      );
    combineLatest(processBar$, userAction$).subscribe(
      () => this.redirectUrlAndPopUp(),
      () => this.redirectUrlAndPopUp()
    );
  }

  private isIEngagementTrascation(object: any): object is IEngagementTransaction {
    return 'voucherIds' in object;
  }
  private isIPlayOutcome(object: any): object is IPlayOutcome {
    return 'vouchers' in object;
  }

  private redirectUrlAndPopUp(): void {
    const state: IPrePlayStateData = {
      popupData: this.popupData,
      engagementType: 'game',
      transactionId: this.transactionId,
      collectInfo: true
    };

    if (this.isAnonymousUser && this.informationCollectionSetting === 'pi_required') {
      this.router.navigate(['/pi'], { state });
    } else if (this.isAnonymousUser && this.informationCollectionSetting === 'signup_required') {
      this.router.navigate(['/signup'], { state });
    } else {
      this.router.navigate(['/wallet']);
      this.notificationService.addPopup(this.popupData);
    }
  }

  private initTranslate(): void {
    if (this.successPopUp.title) {
      this.translate.get(this.successPopUp.title).subscribe((text) => this.successPopUp.title = text);
    }
    if (this.successPopUp.text) {
      this.translate.get(this.successPopUp.text).subscribe((text) => this.successPopUp.text = text);
    }
    if (this.successPopUp.buttonTxt) {
      this.translate.get(this.successPopUp.buttonTxt).subscribe((text) => this.successPopUp.buttonTxt = text);
    }
    if (this.noRewardsPopUp.title) {
      this.translate.get(this.noRewardsPopUp.title).subscribe((text) => this.noRewardsPopUp.title = text);
    }
    if (this.noRewardsPopUp.text) {
      this.translate.get(this.noRewardsPopUp.text).subscribe((text) => this.noRewardsPopUp.text = text);
    }
    if (this.noRewardsPopUp.buttonTxt) {
      this.translate.get(this.noRewardsPopUp.buttonTxt).subscribe((text) => this.noRewardsPopUp.buttonTxt = text);
    }
  }

  public dialogClosed(): void {
    this.router.navigate(['/home']);
  }
}
