import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IGameService, IGame, GameType, IPlayOutcome, PopupComponent, IPopupConfig } from '@perx/core';
import { map, tap, first, filter, switchMap, bufferCount, catchError, takeUntil } from 'rxjs/operators';
import { Observable, interval, combineLatest, throwError, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-pages-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  public gameData$: Observable<IGame>;
  public gt: typeof GameType = GameType;
  private campaignId: number;
  private engagementId: number | null = null;
  public progressValue: number;
  private destroy$: Subject<any> = new Subject();
  public successPopUp: IPopupConfig = {
    title: 'Congratulations!',
    text: '',
    buttonTxt: 'View Reward',
    imageUrl: 'assets/congrats_image.png',
  };

  public noRewardsPopUp: IPopupConfig = {
    title: 'Thanks for playing',
    text: 'Unfortunately, you did not win anything this time',
    buttonTxt: 'Back to Wallet',
    imageUrl: '',
  };

  private initTranslate(): void {
    this.translate.get('VIEW_REWARD').subscribe((text) => this.successPopUp.buttonTxt = text);
    this.translate.get('BACK_TO_WALLET').subscribe((text) => this.noRewardsPopUp.buttonTxt = text);
  }

  constructor(
    private route: ActivatedRoute,
    private gameService: IGameService,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {
  }

  public ngOnInit(): void {
    this.initTranslate();
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
            this.noRewardsPopUp.title = displayProperties.noRewardsPopUp.headLine || this.noRewardsPopUp.title;
            this.noRewardsPopUp.text = displayProperties.noRewardsPopUp.subHeadLine || this.noRewardsPopUp.text;
            this.noRewardsPopUp.imageUrl = displayProperties.noRewardsPopUp.imageURL || this.noRewardsPopUp.imageUrl;
            this.noRewardsPopUp.buttonTxt = displayProperties.noRewardsPopUp.buttonTxt || this.noRewardsPopUp.buttonTxt;
          }
          if (displayProperties && displayProperties.successPopUp) {
            this.successPopUp.title = displayProperties.successPopUp.headLine || this.successPopUp.title;
            this.successPopUp.text = displayProperties.successPopUp.subHeadLine || this.successPopUp.text;
            this.successPopUp.imageUrl = displayProperties.successPopUp.imageURL || this.successPopUp.imageUrl;
            this.successPopUp.buttonTxt = displayProperties.successPopUp.buttonTxt || this.successPopUp.buttonTxt;
          }

          this.engagementId = game ? game.id : null;
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public gameCompleted(): void {
    const r1 = this.gameService.play(this.campaignId, this.engagementId);
    // display a loader before redirecting to next page
    const delay = 3000;
    const nbSteps = 60;
    const r2: Observable<number[]> = interval(delay / nbSteps)
      .pipe(
        tap(v => this.progressValue = v * 100 / nbSteps),
        bufferCount(nbSteps),
        first()
      );
    combineLatest(r1, r2)
      .pipe(
        catchError(err => throwError(err)),
        takeUntil(this.destroy$)
      )
      // @ts-ignore
      .subscribe(
        ([outcome, _]: [IPlayOutcome, any]) => {
          this.router.navigate(['/wallet']);
          if (outcome.vouchers.length > 0) {
            this.successPopUp.text = this.successPopUp.text ? this.successPopUp.text : `You earned ${outcome.vouchers.length} rewards`;
            this.dialog.open(PopupComponent, { data: this.successPopUp });
          } else {
            this.dialog.open(PopupComponent, { data: this.noRewardsPopUp });
          }
        },
        () => {
          this.router.navigate(['/wallet']);
          this.dialog.open(PopupComponent, { data: this.noRewardsPopUp });
        }
      );
  }
}
