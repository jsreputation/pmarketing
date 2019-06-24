import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, forkJoin, Observable } from 'rxjs';
import { bufferCount, tap, first, map, switchMap, catchError } from 'rxjs/operators';
import { CampaignService, CAMPAIGN_TYPE, GameService, IGame, defaultTree, GAME_TYPE, ICampaign } from '@perx/core/dist/perx-core';
import { POPUP_TYPE } from '../vouchers/vouchers.component';

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

  constructor(private router: Router, private campaignService: CampaignService, private gameService: GameService) { }

  ngOnInit() {
    this.campaignService.getCampaigns()
      .pipe(
        map(res => res.data),
        map((campaigns: ICampaign[]) => campaigns.filter(camp => camp.campaign_type === CAMPAIGN_TYPE.game)),
        map(campaigns => campaigns[0]),
        switchMap((campaign: ICampaign) => this.gameService.getGamesFromCampaign(campaign.id))
      )
      .subscribe(games => {
        this.game = games[0];
        if (this.game.remainingNumberOfTries <= 0) {
          this.router.navigate(['/vouchers', { popup: POPUP_TYPE.completed }]);
        } else {
          this.loading = false;
        }
      });
  }

  done(): void {
    const r1 = this.gameService.play(this.game.id);
    // display a loader before redirecting to next page
    const delay = 3000;
    const nbSteps = 60;
    const r2: Observable<number[]> = interval(delay / nbSteps)
      .pipe(
        tap(v => this.progressValue = v * 100 / nbSteps),
        bufferCount(nbSteps),
        first()
      );
    forkJoin(r1, r2)
      .subscribe(() => { this.router.navigate(['/congrats']); });
  }
}
