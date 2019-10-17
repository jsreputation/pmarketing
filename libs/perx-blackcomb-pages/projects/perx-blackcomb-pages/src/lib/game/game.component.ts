import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IGameService, IGame, GameType, IPlayOutcome, PopupComponent } from '@perx/core';
import { map, tap, first, filter, switchMap, bufferCount, catchError } from 'rxjs/operators';
import { Observable, interval, combineLatest, throwError } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'perx-blackcomb-pages-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameData$: Observable<IGame>;
  public gt: typeof GameType = GameType;
  private campaignId: number;
  private engagementId: number;
  public progressValue: number;

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
      tap((game: IGame) => this.engagementId = game.id)
    );
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
      .pipe(catchError(err => throwError(err)))
      // @ts-ignore
      .subscribe(([outcome, c]: [IPlayOutcome, any]) => {
        this.router.navigate(['/wallet']);
        if (outcome.vouchers.length > 0) {
          this.dialog.open(PopupComponent, {
            data: {
              title: 'Congratulations!',
              text: `You earned ${outcome.vouchers.length} rewards`,
              buttonTxt: 'View Rewards',
              imageUrl: 'assets/congrats_image.png',
            }
          });
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
