import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IGameService, NotificationService, IGame, GameType, IPlayOutcome, Voucher } from '@perx/core';
import { Location } from '@angular/common';
import { map, take } from 'rxjs/operators';
import { AnalyticsService, PageType } from '../analytics.service';
import { GameOutcomeService } from '../congrats/game-outcome/game-outcome.service';

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
  public numberOfTaps: number | null;
  public isGameAvailable: boolean = false;
  public isButtonDisabled: boolean = true;
  public game: IGame;
  public backgroundImage: string = '';
  public pinata: GameType = GameType.pinata;
  public shakeTheTree: GameType = GameType.shakeTheTree;

  constructor(
    private activeRoute: ActivatedRoute,
    private gameService: IGameService,
    private location: Location,
    private notificationService: NotificationService,
    private router: Router,
    private analytics: AnalyticsService,
    private gameOutcomeService: GameOutcomeService
  ) { }

  public ngOnInit(): void {

    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params.id) {
        const id = parseInt(params.id, 10);
        this.fetchGame(id);

      } else if (params.cid) {
        const cid = parseInt(params.cid, 10);
        this.fetchGameFromCampaign(cid);
      }
    });
  }

  private fetchGame(gameId: number): void {
    this.gameService.get(gameId).subscribe(
     (game: IGame) => {
        this.game = game;
        this.buttonText = game.texts.button || 'Start playing';
        this.title = game.texts.title || 'Shake the Pinata';
        this.subTitle = game.texts.subTitle || 'Shake the Pinata and Win!';
        this.isGameAvailable = true;
        this.isButtonDisabled = false;
        if (game.config && ('nbTaps' in game.config)) {
          this.numberOfTaps = game.config && game.config.nbTaps;
        }

        if (game.type === GameType.shakeTheTree) {
          this.backgroundImage = game.backgroundImg || 'assets/tree/background.jpg';
        }

        if (game.type === GameType.pinata) {
          this.backgroundImage = game.backgroundImg || '';
        }

        if (game.remainingNumberOfTries <= 0) {
          this.isButtonDisabled = true;
          this.notificationService.addPopup({
            title: game.results.noOutcome && game.results.noOutcome.title,
            text: game.results.noOutcome && game.results.noOutcome.subTitle,
            buttonTxt: game.results.noOutcome && game.results.noOutcome.button,
            afterClosedCallBack: this,
            panelClass: 'custom-class'
          });
        }

        this.analytics.addEvent({
          pageName: `rewards:game:${this.title}`,
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
          text: 'Something is wrong, game cannot be played at the moment!',
          panelClass: 'custom-class'
        });
      }
    );
  }

  private fetchGameFromCampaign(campaignId: number): void {
    this.gameService.getGamesFromCampaign(campaignId)
      .pipe(
        take(1),
        map((games: IGame[]) => games[0])
      )
      .subscribe(
        (game: IGame) => {
          if (!game) {
            this.notificationService.addPopup({
              title: 'Oooops!',
              text: 'Something is wrong, game cannot be played at the moment!'
            });
            return;
          }
          this.fetchGame(game.id);
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
        panelClass: 'custom-class'
      });
    } else {
      this.location.back();
    }
  }

  public dialogClosed(): void {
    this.location.back();
  }

  public gameCompleted(): void {
    this.gameService.play(this.game.id)
      .pipe(
        map((game: IPlayOutcome) => game.vouchers)
      )
      .subscribe(
        (vouchs: Voucher[]) => {
          if (vouchs.length === 0) {
            this.showNoRewardsPopUp();
          } else {
            this.gameOutcomeService.setVouchersList(vouchs);
            if (this.game.results && this.game.results.outcome) {
              this.gameOutcomeService.setOutcome(this.game.results.outcome);
            }
            this.router.navigate(['/congrats']);
          }
        },
        () => this.showNoRewardsPopUp()
      );
  }

  private showNoRewardsPopUp(): void {
    this.notificationService.addPopup({
      title: this.game.results.noOutcome && this.game.results.noOutcome.title,
      text: this.game.results.noOutcome && this.game.results.noOutcome.subTitle,
      buttonTxt: this.game.results.noOutcome && this.game.results.noOutcome.button,
      afterClosedCallBack: this,
      panelClass: 'custom-class'
    });
  }
}
