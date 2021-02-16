import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService, PageType } from '../analytics.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public errorType: string;

  constructor(private analytics: AnalyticsService,
              private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation) {
          const state = navigation.extras.state as { errorType: string };
          this.errorType = state.errorType;
        }
  }

  public ngOnInit(): void {
    this.analytics.addEvent({
      pageName: 'error',
      pageType: PageType.errorPage,
      siteSectionLevel2: 'rewards:error',
      siteSectionLevel3: 'rewards:error'
    });
  }
}
