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
  IPrePlayStateData
} from '@perx/core';
import { map, tap, first, filter, switchMap, bufferCount, catchError, takeUntil } from 'rxjs/operators';
import { Observable, interval, throwError, Subject, of, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'perx-blackcomb-pages-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  public gameData$: Observable<IGame>;
  public gt: typeof GameType = GameType;
  private campaignId: number;
  private transactionId: number | null = null;
  public progressValue: number;
  private destroy$: Subject<any> = new Subject();
  private popupData: IPopupConfig;
  private isAnonymousUser: boolean;
  private informationCollectionSetting: string;
  public willWin: boolean;
  public successPopUp: IPopupConfig = {
    title: 'GAME_SUCCESS_TITLE',
    text: 'GAME_SUCCESS_TEXT',
    buttonTxt: 'VIEW_REWARD',
    imageUrl: 'assets/congrats_image.png',
  };

  public noRewardsPopUp: IPopupConfig = {
    title: 'GAME_NO_REWARDS_TITLE',
    text: 'GAME_NO_REWARDS_TEXT',
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
          if (err.status === 403) {
            this.router.navigate(['/wallet']);
          }
          throw err;
        }))
      ),
      first(),
      tap((games: IGame[]) => !games || !games.length && this.router.navigate(['/wallet'])),
      map((games: IGame[]) => games[0]),
      tap((game: IGame) => {
        if (game) {
          const { displayProperties } = game;
          if (displayProperties && displayProperties.informationCollectionSetting) {
            this.informationCollectionSetting = displayProperties.informationCollectionSetting;
          }
          if (displayProperties && displayProperties.noRewardsPopUp) {
            this.noRewardsPopUp.title = displayProperties.noRewardsPopUp.headLine;
            this.noRewardsPopUp.text = displayProperties.noRewardsPopUp.subHeadLine;
            this.noRewardsPopUp.imageUrl = displayProperties.noRewardsPopUp.imageURL || this.noRewardsPopUp.imageUrl;
            this.noRewardsPopUp.buttonTxt = displayProperties.noRewardsPopUp.buttonTxt || this.noRewardsPopUp.buttonTxt;
          }
          if (displayProperties && displayProperties.successPopUp) {
            this.successPopUp.title = displayProperties.successPopUp.headLine;
            this.successPopUp.text = displayProperties.successPopUp.subHeadLine;
            this.successPopUp.imageUrl = displayProperties.successPopUp.imageURL || this.successPopUp.imageUrl;
            this.successPopUp.buttonTxt = displayProperties.successPopUp.buttonTxt || this.successPopUp.buttonTxt;
          }
        }
      })
    );
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
          const count = gameTransaction.voucherIds.length.toString();
          this.willWin = true;
          this.successPopUp.text =
            this.successPopUp.text ? this.successPopUp.text.replace('{{rewards}}', count) : `You earned ${count} rewards`;
          this.popupData = this.successPopUp;
        } else {
          this.willWin = false;
          this.popupData = this.noRewardsPopUp;
        }
      },
      () => {
        this.popupData = this.noRewardsPopUp;
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public gameCompleted(): void {
    // display a loader before redirecting to next page
    const delay = 3000;
    const nbSteps = 60;
    const processBar$ = interval(delay / nbSteps)
      .pipe(
        tap(v => this.progressValue = v * 100 / nbSteps),
        bufferCount(nbSteps),
        first()
      );
    const isCollectDataRequired = !!(this.informationCollectionSetting === 'pi_required' || this.informationCollectionSetting === 'signup_required');
    const userAction$: Observable<void> = !this.transactionId || (this.isAnonymousUser && isCollectDataRequired) ?
      of(void 0) :
      this.gameService.prePlayConfirm(this.transactionId);
    combineLatest(processBar$, userAction$).subscribe(
      () => this.redirectUrlAndPopUp(),
      () => this.redirectUrlAndPopUp()
    );
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
}
