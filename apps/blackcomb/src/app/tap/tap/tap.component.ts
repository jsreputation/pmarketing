import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import {
  // NotificationService,
  IGame,
  // GameType,
  IGameService
} from '@perx/core';
import { filter, switchMap, map, tap } from 'rxjs/operators';
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
    // private router: Router,
    // private notificationService: NotificationService,
    private gameService: IGameService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.game$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => {
          const id: string = params.get('id');
          return Number.parseInt(id, 10);
        }),
        switchMap(idN => this.gameService.get(idN)), // changed from getgamesfromcampaign
        // map((games: IGame[]) => games.filter(game => game.type === GameType.pinata)),
        // map((games: IGame[]) => games[0])
      );
    this.game$
      .pipe(
        tap(game => console.log(game)), // testing out
        filter(game => game.remainingNumberOfTries <= 0)
      );
      // .subscribe(
      //   () => this.router.navigate(['/wallet']),
      //   () => this.router.navigate(['/wallet'])
      // );
  }

  // public gameCompleted(): void {
  //   setTimeout(() => {
  //     this.gameService.postPlay()
  //       .subscribe(
  //         () => {
  //           this.router.navigate(['/wallet']);
  //           this.notificationService.addPopup({
  //             title: 'Congratulations!',
  //             text: this.congratsDetailText,
  //             buttonTxt: 'View Rewards',
  //             imageUrl: 'assets/congrats_image.png',
  //           })
  //         }
  //       );

  //   }, 2000);
  // }
}
