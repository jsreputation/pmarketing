import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  NotificationService,
  IGame,
  IGameService,
  GameType
} from '@perx/core';
import { switchMap, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent implements OnInit {
  public game$: Observable<IGame>;
  public isEnabled: boolean = false;

  public congratsDetailText: string = 'You just won 2 rewards';

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private gameService: IGameService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.game$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          const idN = Number.parseInt(id, 10);
          return this.gameService.getGamesFromCampaign(idN);
        }),
        map((games: IGame[]) => games.filter(game => game.type === GameType.shakeTheTree)[0])
      );
    this.game$
      .pipe(
        filter(game => game.remainingNumberOfTries <= 0)
      ).subscribe(
        () => this.router.navigate(['/wallet']),
        () => this.router.navigate(['/wallet'])
      );
  }

  public gameCompleted(): void {
    setTimeout(() => {
      // this.gameService.postPlay();
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
