import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IGameService, IGame, GameType, IPlayOutcome, PopupComponent, IPopupConfig } from '@perx/core';
import { map, tap, first, filter, switchMap, bufferCount, catchError, takeUntil } from 'rxjs/operators';
import { Observable, interval, combineLatest, throwError, Subject } from 'rxjs';
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
  private engagementId: number | null;
  public progressValue: number;
  private destroy$: Subject<any> = new Subject();
  public congratulationsPopUp: IPopupConfig = {
    title: 'Congratulations!',
    text: '',
    buttonTxt: 'View Rewards',
    imageUrl: 'assets/congrats_image.png',
  };

  constructor(
    private route: ActivatedRoute,
    private gameService: IGameService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
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
        if (game && game.display_properties && game.display_properties.congratulationsPopUp.imageURL) {
          this.congratulationsPopUp.imageUrl = game.display_properties.congratulationsPopUp.imageURL;
        }
        this.engagementId = game ? game.id : null;
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
            this.congratulationsPopUp.text = `You earned ${outcome.vouchers.length} rewards`;
            this.dialog.open(PopupComponent, { data: this.congratulationsPopUp });
          } else {
            this.dialog.open(PopupComponent, {
              data: {
                title: 'Thanks for playing',
                text: 'Unfortunately, you did not win anything this time',
                buttonTxt: 'Go to Wallet',
              }
            });
          }
        },
        () => {
          this.router.navigate(['/wallet']);
          this.dialog.open(PopupComponent, {
            data: {
              title: 'Thanks for playing',
              text: 'Unfortunately, you did not win anything this time',
              buttonTxt: 'Go to Wallet',
            }
          });
        }
      );
  }
}
