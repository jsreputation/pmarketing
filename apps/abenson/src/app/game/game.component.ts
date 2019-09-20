import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGameService, IGame, NotificationService } from '@perx/core';
import { flatMap, take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameData$: Observable<IGame>;
  public congratsDetailText: string = 'You just won 2 rewards';
  constructor(
    private route: ActivatedRoute,
    private gameService: IGameService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.gameData$ = this.route.params.pipe(
      flatMap((params) => this.gameService.getGamesFromCampaign(+params.id)),
      take(1),
      tap((games) => !games || !games.length && this.router.navigate(['/wallet'])),
      map((games) => games[0]),
    );
  }

  public gameCompleted(): void {
    setTimeout(() => {
      this.router.navigate(['/wallet']);
      this.notificationService.addPopup({
        title: 'Congratulations!',
        text: this.congratsDetailText,
        buttonTxt: 'View Rewards',
        imageUrl: 'assets/congrats_image.png',
      });
    }, 2000);
  }

}
