import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameService, GameType, NotificationService } from '@perx/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public isEnabled: boolean = false;
  public buttonText: string;
  public title: string;
  public subtitle: string;
  public nbTaps: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private gameService: GameService,
    private location: Location,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      ((params: Params) => {
      if (params.id) {
        console.log('have params id', params.id);
        this.getGame(params.id);
      }
    }));
  }

  private getGame(gameId: number): void {
    this.gameService.get(gameId).subscribe((game) => {
      if (game && game.type === GameType.pinata) {
        this.buttonText = game.texts.button ? game.texts.button : 'Start playing';
        this.title = game.texts.title ? game.texts.title : 'Shake the Pinata';
        this.subtitle = game.texts.subTitle ? game.texts.subTitle : 'Shake the Pinata and Win!';
        this.nbTaps = game.config.nbTaps;
      }
    });
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
      this.router.navigate(['/congrats']);
    }, 2000);
  }
}
