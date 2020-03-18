import { Component, OnInit } from '@angular/core';
import { Voucher } from '@perxtech/core';
import { AnalyticsService, PageType } from '../analytics.service';
import { GameOutcomeService } from './game-outcome/game-outcome.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  public vouchers: Voucher[];

  constructor(
    private analytics: AnalyticsService,
    private gameOutcomeService: GameOutcomeService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.vouchers = this.gameOutcomeService.getVouchersRewarded();

    this.analytics.addEvent({
      pageName: 'rewards:game:congrats',
      pageType: PageType.static,
      siteSectionLevel2: 'rewards:game',
      siteSectionLevel3: 'rewards:game:congrats'
    });
  }

  public navigateToRewards(): void {
    this.gameOutcomeService.clearVoucherList();
    this.router.navigateByUrl('/home/vouchers');
  }
}
