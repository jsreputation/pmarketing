import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, forkJoin, Observable, of } from 'rxjs';
import { bufferCount, tap, take, map, switchMap, catchError } from 'rxjs/operators';
import {
  CampaignService,
  CAMPAIGN_TYPE,
  GameService,
  IGame,
  defaultTree,
  GAME_TYPE,
  ICampaign
} from '@perx/core/dist/perx-core';
import { POPUP_TYPE } from '../vouchers/vouchers.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  playing = false;
  progressValue: number = null;
  loading = true;
  game: IGame = {
    id: -1,
    campaignId: -1,
    type: GAME_TYPE.shakeTheTree,
    remainingNumberOfTries: 20,
    config: { ...defaultTree(), treeImg: '', giftImg: '' },
  };
  isWhistler: boolean;

  constructor(private router: Router,
    private campaignService: CampaignService,
    private gameService: GameService) {
    this.isWhistler = environment.isWhistler;
  }

  ngOnInit() {
    this.campaignService.getCampaigns()
      .pipe(
        map(res => res.data),
        map((campaigns: ICampaign[]) => campaigns.filter(camp => camp.campaign_type === CAMPAIGN_TYPE.test)),
        map(campaigns => campaigns[0]),
        switchMap((campaign: ICampaign) => this.gameService.getGamesFromCampaign(campaign.id)),
        catchError(err => {
          return of({ hasError: true, errorMsg: err });
        })
      )
      .subscribe(games => {
        if (games[`hasError`]) {
          this.router.navigate(['/vouchers']);
        } else {
          this.game = games[0];
          if (this.game.remainingNumberOfTries <= 0) {
            this.router.navigate(['/vouchers', { popup: POPUP_TYPE.completed }]);
          }
        }
        this.loading = false;
      });
  }

  done(): void {
    const r1 = this.gameService.play(this.game.id)
      .pipe(
        map(res => res.data),
        catchError(err => of(err))
      );
    // display a loader before redirecting to next page
    const delay = 3000;
    const nbSteps = 60;
    const r2: Observable<number[]> = interval(delay / nbSteps)
      .pipe(
        tap(v => this.progressValue = v * 100 / nbSteps),
        bufferCount(nbSteps),
        take(1)
      );
    forkJoin(r1, r2)
      .subscribe(
        ([resr1, resr2]) => {
          let numRewards;
          if (!this.isWhistler) {
            if (resr1.status && resr1.status === 400) {
              if (resr1.error.code === 4103) {
                // no rewards available for specified user
                numRewards = 0;
              }
            } else { // success
              // get number of rewards
              numRewards = resr1.outcomes.length;
            }
          }

          this.router.navigate(['/result'], { queryParams: { numRewards } });
        });
  }
}
