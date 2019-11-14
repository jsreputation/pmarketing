import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IGameService, IGame, GameType, IPopupConfig, IEngagementTransaction, AuthenticationService, PopupComponent } from '@perx/core';
import { map, tap, first, filter, switchMap, bufferCount, catchError, takeUntil } from 'rxjs/operators';
import { Observable, interval, throwError, Subject, of, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';

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

  private initTranslate(): void {
    this.translate.get(this.successPopUp.title).subscribe((text) => this.successPopUp.title = text);
    this.translate.get(this.successPopUp.text).subscribe((text) => this.successPopUp.text = text);
    this.translate.get(this.successPopUp.buttonTxt).subscribe((text) => this.successPopUp.buttonTxt = text);
    this.translate.get(this.noRewardsPopUp.title).subscribe((text) => this.noRewardsPopUp.title = text);
    this.translate.get(this.noRewardsPopUp.text).subscribe((text) => this.noRewardsPopUp.text = text);
    this.translate.get(this.noRewardsPopUp.buttonTxt).subscribe((text) => this.noRewardsPopUp.buttonTxt = text);
  }

  constructor(
    private route: ActivatedRoute,
    private gameService: IGameService,
    private router: Router,
    private dialog: MatDialog,
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
      switchMap((id: number) => this.gameService.getGamesFromCampaign(id)),
      first(),
      tap((games: IGame[]) => !games || !games.length && this.router.navigate(['/wallet'])),
      map((games: IGame[]) => games[0]),
      tap((game: IGame) => {
        if (game) {
          const { displayProperties } = game;
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
        if (gameTransaction.voucherIds.length > 0) {
          const count = gameTransaction.voucherIds.length.toString();
          this.successPopUp.text =
            this.successPopUp.text ? this.successPopUp.text.replace('{{rewards}}', count) : `You earned ${count} rewards`;
          this.popupData = this.successPopUp;
        } else {
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
    const userAction$ = this.isAnonymousUser ? of(true) : this.gameService.prePlayConfirm(this.transactionId);
    combineLatest(processBar$, userAction$).subscribe(
      () => this.redirectUrlAndPopUp(),
      () => this.redirectUrlAndPopUp()
    );
  }

  private redirectUrlAndPopUp(): void {
    const queryParams = { popupData: JSON.stringify(this.popupData), engagementType: 'game', transactionId: this.transactionId };

    if (this.isAnonymousUser) {
      this.router.navigate(['/pi'], { queryParams });
    }
    this.router.navigate(['/wallet']);
    this.dialog.open(PopupComponent, { data: this.popupData });
  }
}
