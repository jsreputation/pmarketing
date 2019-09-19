import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IGameService, NotificationService, IGame } from '@perx/core';
import { Location } from '@angular/common';
import { filter, map, switchMap } from 'rxjs/operators';
import { AnalyticsService, PageType } from '../analytics.service';

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
  public numberOfTaps: number;
  public isGameAvailable: boolean = false;
  public isButtonDisabled: boolean = true;
  public game: IGame;
  public backgroundImage: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private gameService: IGameService,
    private location: Location,
    private notificationService: NotificationService,
    private router: Router,
    private analytics: AnalyticsService
  ) { }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id),
        map((params: Params) => Number.parseInt(params.id, 10)),
        switchMap((gameId: number) => this.gameService.get(gameId))
      )
      .subscribe(
        (game: IGame) => {
          this.game = game;
          this.buttonText = game.texts.button || 'Start playing';
          this.title = game.texts.title || 'Shake the Pinata';
          this.subTitle = game.texts.subTitle || 'Shake the Pinata and Win!';
          this.isGameAvailable = true;
          this.isButtonDisabled = false;
          this.numberOfTaps = game.config.nbTaps;
          this.backgroundImage = game.backgroundImg;

          if (game.remainingNumberOfTries <= 0) {
            this.isButtonDisabled = true;
            this.notificationService.addPopup({
              title: 'No more tries',
              text: 'Come back when you\'ve earned more tries!',
              buttonTxt: '',
            });
          }

          this.analytics.addEvent({
            pageName: 'rewards:game',
            pageType: PageType.static,
            siteSectionLevel2: 'rewards:game',
            siteSectionLevel3: 'rewards:game'
          });
        },
        (err: any) => {
          console.log(err);
          this.isEnabled = false;
          this.notificationService.addPopup({
            title: 'Oooops!',
            text: 'Something is wrong, game cannot be played at the moment!'
          });
        }
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
      });
    } else {
      this.location.back();
    }
  }

  public dialogClosed(): void {
    this.location.back();
  }

  public gameCompleted(): void {
    setTimeout(() => {
      this.router.navigate(['/congrats'], { queryParams: { gameId: this.game.id } });
    }, 2000);
  }
}
