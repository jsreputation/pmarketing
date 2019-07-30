// tslint:disable: rxjs-no-nested-subscribe
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CampaignService, CAMPAIGN_TYPE, IGame, GameService, ICampaign, NotificationService } from '@perx/core';
import { map, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public game: IGame;

  public gameId: number;
  public campaignId: number;

  public isEnabled: boolean = false;
  public title: string = 'Hit the Pinata and Win!';
  public subTitle: string = 'Enjoy your Gold membership reward.';
  public buttonTxt: string = 'Start playing';
  public numberOfTaps: number = 5;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private gameService: GameService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.gameId = Number.parseInt(params.get('gameId'), 10);
      if (this.gameId) {
        this.gameService.get(this.gameId)
          .pipe(take(1))
          .subscribe(
            (game: IGame) => this.game = game,
            () => { }
          );
        return;
      }

      this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
        this.campaignId = Number.parseInt(queryParams.get('campaignId'), 10);
        if (!this.campaignId) {
          this.campaignService.getCampaigns()
            .pipe(
              take(1),
              map((campaigns: ICampaign[]) => campaigns.filter((camp: ICampaign) => camp.type === CAMPAIGN_TYPE.game)),
              map((campaigns: ICampaign[]) => campaigns[0])
            )
            .subscribe(
              (campaign: ICampaign) => {
                this.campaignId = campaign.id;
                this.gameService.getGamesFromCampaign(this.campaignId)
                  .pipe(
                    take(1),
                    map((games: IGame[]) => games[0])
                  )
                  .subscribe(
                    (game: IGame) => this.game = game,
                    () => { }
                  );
              },
              () => { }
            );

          return;
        }

        this.gameService.getGamesFromCampaign(this.campaignId)
          .pipe(
            take(1),
            map((games: IGame[]) => games[0])
          )
          .subscribe(
            (game: IGame) => { this.game = game; },
            () => {
              this.isEnabled = true;
              this.notificationService.addPopup({
                text: 'Something went wrong, games are down'
              });
            }
          );
      });
    });
  }

  public onComplete(): void {
    if (this.game) {
      this.gameService.play(this.game.id)
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            if (res) {
              const payload: string = btoa(JSON.stringify(res));
              this.router.navigate([`/result`], { queryParams: { payload } });
            }
          },
          (e: HttpErrorResponse) => {
            if (e && e.error) {
              const payload: string = btoa(JSON.stringify(e.error));
              this.router.navigate([`/result`], { queryParams: { payload } });
            }
          }
        );
    }
  }
}
