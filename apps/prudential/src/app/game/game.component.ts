import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { bufferCount, tap, first, map } from 'rxjs/operators';
import { CampaignService, CAMPAIGN_TYPE } from '@perx/core/dist/perx-core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  playing = false;
  progressValue: number = null;
  constructor(private router: Router, private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaignService.getCampaigns()
      .pipe(
        map(res => res.data),
        map(campaigns => campaigns.filter(camp => camp.campaign_type === CAMPAIGN_TYPE.game))
      )
      .subscribe(campaigns => {
        if (campaigns.length === 0) {
          this.router.navigate(['/vouchers', { popup: 'expired' }]);
        }
      });
  }

  done(): void {
    // display a loader before redirecting to next page
    const delay = 3000;
    const nbSteps = 60;
    interval(delay / nbSteps)
      .pipe(
        tap(v => this.progressValue = v * 100 / nbSteps),
        bufferCount(nbSteps),
        first()
      ).subscribe(() => { this.router.navigate(['/congrats']); });
  }
}
