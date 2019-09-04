import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import {
  NotificationService,
  IGame,
  GameType,
  GameService
} from '@perx/core';
import { filter, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent implements OnInit {

  public game$: Observable<IGame>;
  public isEnabled: boolean = false;

  public congratsDetailText: string = 'You just won 2 rewards';

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private gameService: GameService,
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
        map((games: IGame[]) => games.filter(game => game.type === GameType.pinata)[0])
      );
    this.actionOnGameStatus();
  }

  public actionOnGameStatus(): void {
    this.game$.subscribe(game => {
      if (game.remainingNumberOfTries <= 0) {
        this.router.navigate(['/wallet']);
      }
    },
      () => {
        this.router.navigate(['/wallet']);
      }
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
