import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGameService, IGame, PopupComponent, GameType } from '@perx/core';
import { flatMap, take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameData$: Observable<IGame>;
  public congratsDetailText: string = 'You just won 2 rewards';
  public gt: typeof GameType = GameType;
  constructor(
    private route: ActivatedRoute,
    private gameService: IGameService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.gameData$ = this.route.params.pipe(
      flatMap((params) => this.gameService.getGamesFromCampaign(parseInt(params.id, 10))),
      take(1),
      tap((games) => !games || !games.length && this.router.navigate(['/wallet'])),
      map((games) => games[0])
    );
  }

  public gameCompleted(): void {
    const dialog = this.dialog.open(PopupComponent, {
      data: {
        title: 'Congratulations!',
        text: this.congratsDetailText,
        buttonTxt: 'View Rewards',
        imageUrl: 'assets/congrats_image.png',
      }
    });
    dialog.afterClosed().subscribe(() => {
      this.router.navigate(['/wallet']);
    });
  }
}
