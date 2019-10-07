import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voucher } from '@perx/core';
import { AnalyticsService, PageType } from '../analytics.service';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  public vouchers: Voucher[];

  constructor(
    private router: Router,
    private analytics: AnalyticsService
  ) {
      const currentNavigation = this.router.getCurrentNavigation();
      if (currentNavigation && currentNavigation.extras.hasOwnProperty('state')) {
        this.vouchers = currentNavigation.extras.state.vouchers;
      }
  }

  public ngOnInit(): void {

    this.analytics.addEvent({
      pageName: 'rewards:game:congrats',
      pageType: PageType.static,
      siteSectionLevel2: 'rewards:game',
      siteSectionLevel3: 'rewards:game:congrats'
    });
  }
}
