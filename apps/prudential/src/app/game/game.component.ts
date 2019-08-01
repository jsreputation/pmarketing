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
} from '@perx/core';
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
    texts: {},
    results: {},
    config: { ...defaultTree(), treeImg: '', giftImg: '' },
  };
  isWhistler: boolean;
  $game: Observable<IGame>;

  constructor(
    private router: Router,
    private campaignService: CampaignService,
    private gameService: GameService
  ) {
    this.isWhistler = environment.isWhistler;
  }

  ngOnInit() {
    this.$game = this.campaignService.getCampaigns()
      .pipe(
        map((campaigns: ICampaign[]) => campaigns.filter(camp => camp.type === CAMPAIGN_TYPE.game)),
        map(campaigns => campaigns[0]),
        switchMap((campaign: ICampaign) => this.gameService.getGamesFromCampaign(campaign.id)),
        map(game => game[0])
      );
    this.actionOnGameStatus();

  }

  actionOnGameStatus(): void {
    this.$game.subscribe(game => {
      this.game = game;
      console.log(this.game.remainingNumberOfTries);
      if (this.game.remainingNumberOfTries <= 0) {
        this.router.navigate(['/vouchers', { popup: POPUP_TYPE.completed }]);
      }
      this.loading = false;
    },
      () => {
        this.router.navigate(['/vouchers']);
      }
    );
  }

  done(): void {
    const r1 = this.gameService.play(this.game.id)
      .pipe(
        map(res => res.data)
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
    let numRewards = 0;

    forkJoin(r1, r2).subscribe(
      ([resr1, resr2]) => {
        if (!this.isWhistler) {
          numRewards = resr1.outcomes.length;
        }
        this.router.navigate(['/result'], { queryParams: { numRewards } });
      },
      () => {
        this.router.navigate(['/result'], { queryParams: { numRewards } });
      }
    );
  }
}
