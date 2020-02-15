import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameType, IEngagementTransaction, IGame, IGameService, IPlayOutcome, NotificationService, Voucher} from '@perx/core';
import {Location} from '@angular/common';
import {catchError, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {AnalyticsService, PageType} from '../analytics.service';
import {GameOutcomeService} from '../congrats/game-outcome/game-outcome.service';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public isEnabled: boolean = false;
  public buttonText: string;
  public title: string;
  public subTitle: string;
  public numberOfTaps: number | null;
  public isGameAvailable: boolean = false;
  public isButtonDisabled: boolean = true;
  public gameData$: Observable<IGame>;
  public game: IGame;
  public gameTransaction: IEngagementTransaction;
  private destroy$: Subject<any> = new Subject();
  public backgroundImage: string = '';
  public willWin: boolean = false;
  public pinata: GameType = GameType.pinata;
  public shakeTheTree: GameType = GameType.shakeTheTree;
  public scratch: GameType = GameType.scratch;

  constructor(
    private activeRoute: ActivatedRoute,
    private gameService: IGameService,
    private location: Location,
    private notificationService: NotificationService,
    private router: Router,
    private analytics: AnalyticsService,
    private gameOutcomeService: GameOutcomeService
  ) { }

  public ngOnInit(): void {
    this.gameData$ = this.loadGame();
  }

  public loadGame(): Observable<IGame> {
    return this.activeRoute.queryParams
      .pipe(
        switchMap((params: Params) => {
          if (params.id) {
            const id = parseInt(params.id, 10);
            return this.gameService.get(id);
          }

          const cid = parseInt(params.cid, 10);
          return this.gameService.getGamesFromCampaign(cid).pipe(
            take(1),
            map((games: IGame[]) => games[0])
          );
        }),
        tap(
          (game: IGame) => {
            if (!game) {
              this.showErrorPopup();
              return;
            }
            this.game = game;
            this.buttonText = game.texts.button || 'Start playing';
            this.title = game.texts.title || 'Shake the Pinata';
            this.subTitle = game.texts.subTitle || 'Shake the Pinata and Win!';
            this.isGameAvailable = true;
            this.isButtonDisabled = false;
            if (game.config && ('nbTaps' in game.config)) {
              this.numberOfTaps = game.config && game.config.nbTaps;
            }

            if (game.type === GameType.shakeTheTree) {
              this.backgroundImage = game.backgroundImg || 'assets/tree/background.jpg';
            }

            if (game.type === GameType.pinata) {
              this.backgroundImage = game.backgroundImg || '';
            }

            if (game.type === GameType.scratch) {
              this.backgroundImage = game.backgroundImg || '';
            }

            if (game.remainingNumberOfTries !== null && game.remainingNumberOfTries <= 0) {
              this.isButtonDisabled = true; // important
              this.notificationService.addPopup({
                title: game.results.noOutcome && game.results.noOutcome.title,
                text: game.results.noOutcome && game.results.noOutcome.subTitle,
                buttonTxt: game.results.noOutcome && game.results.noOutcome.button,
                afterClosedCallBack: this,
                panelClass: 'custom-class'
              });
            }

            this.analytics.addEvent({
              pageName: `rewards:game:${this.title}`,
              pageType: PageType.static,
              siteSectionLevel2: 'rewards:game',
              siteSectionLevel3: 'rewards:game'
            });
          }
        ),
        catchError((err: HttpErrorResponse) => {
          this.showErrorPopup();
          throw err;
        }),
        takeUntil(this.destroy$)
      );
  }

  private showErrorPopup(): void {

    this.notificationService.addPopup({
      title: 'Oooops!',
      text: 'Something is wrong, game cannot be played at the moment!',
      panelClass: 'custom-class'
    });
  }

  public loadPreplay(): void {
    if (this.game && this.game.remainingNumberOfTries > 0) {
      this.gameData$.pipe(
        switchMap(
          (game) => this.gameService.prePlay(game.id)
        ),
        catchError(err => throwError(err)),
        takeUntil(this.destroy$)
      ).subscribe(
        (gameTransaction: IEngagementTransaction) => {
          this.gameTransaction = gameTransaction;
          if (gameTransaction.voucherIds && gameTransaction.voucherIds.length > 0) {
            // set this as a property
            if (this.game.results && this.game.results.outcome) {
              this.gameOutcomeService.setOutcome(this.game.results.outcome);
              this.willWin = true;
              this.isButtonDisabled = false;
            }
          } else {
            this.willWin = false;
            this.isButtonDisabled = false;
          }
        },
        () => {
          this.showErrorPopup();
        }
      );
    }
  }

  public preplayGameCompleted(): void {
    this.gameService.prePlayConfirm(this.gameTransaction.id)
      .pipe(
        map((game: IPlayOutcome) => game.vouchers),
      ).subscribe(
        (vouchs: Voucher[]) => {
          if (vouchs.length === 0) {
            this.showNoRewardsPopUp();
          } else {
            this.gameOutcomeService.setVouchersList(vouchs);
            if (this.game.results && this.game.results.outcome) {
              this.gameOutcomeService.setOutcome(this.game.results.outcome);
            }
            this.router.navigate(['/congrats']);
          }
        },
        () => this.showNoRewardsPopUp()
      );
  }

  public goBack(): void {
    if (this.isEnabled) {
      this.notificationService.addPopup({
        title: 'Do you want to quit now?',
        text: 'By leaving, your progress will not be saved.', // You’ve got a “Shake the Tree” reward!
        buttonTxt2: 'Keep playing',
        buttonTxt: 'Quit game',
        afterClosedCallBack: this,
        panelClass: 'custom-class'
      });
    } else {
      this.location.back();
    }
  }

  public dialogClosed(): void {
    this.location.back();
  }

  public gameCompleted(): void {
    this.gameService.play(this.game.id)
      .pipe(
        map((game: IPlayOutcome) => game.vouchers)
      )
      .subscribe(
        (vouchs: Voucher[]) => {
          if (vouchs.length === 0) {
            this.showNoRewardsPopUp();
          } else {
            this.gameOutcomeService.setVouchersList(vouchs);
            if (this.game.results && this.game.results.outcome) {
              this.gameOutcomeService.setOutcome(this.game.results.outcome);
            }
            this.router.navigate(['/congrats']);
          }
        },
        () => this.showNoRewardsPopUp()
      );
  }

  private showNoRewardsPopUp(): void {
    this.notificationService.addPopup({
      title: this.game.results.noOutcome && this.game.results.noOutcome.title,
      text: this.game.results.noOutcome && this.game.results.noOutcome.subTitle,
      buttonTxt: this.game.results.noOutcome && this.game.results.noOutcome.button,
      afterClosedCallBack: this,
      disableOverlayClose: true,
      panelClass: 'custom-class'
    });
  }
}
