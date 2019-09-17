import { Component, OnInit } from '@angular/core';
import { AnalyticsService, PageType } from '../analytics.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  constructor(private analytics: AnalyticsService) {
  }

  public ngOnInit(): void {
    this.analytics.addEvent({
      pageName: 'rewards:error',
      pageType: PageType.errorPage,
      siteSectionLevel2: 'rewards:error',
      siteSectionLevel3: 'rewards:error'
    });
  }
}
