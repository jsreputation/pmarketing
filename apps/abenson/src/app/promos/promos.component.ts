import { Component, OnInit } from '@angular/core';
import { FeedItem, FeedReaderService } from '@perx/core';
import { AnalyticsService, PageType } from '../analytics.service';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { Observable } from 'rxjs';

interface FeedItemGroup {
  label: string;
  items: Observable<FeedItem[]>;
}
@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})
export class PromosComponent implements OnInit {
  public itemsGroup$: FeedItemGroup[];
  constructor(
    private reader: FeedReaderService,
    private analytics: AnalyticsService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.itemsGroup$ = [
      {
        label: 'Exclusives',
        items: this.reader.getFromUrl('https://cors-proxy.perxtech.io/?url=https://plusrewards.wordpress.com/feed/')
      }, {
        label: 'Promotions',
        items: this.reader.getFromUrl('https://cors-proxy.perxtech.io/?url=https://plusrewards.wordpress.com/feed/')
      }
    ];
  }

  public readMore(item: FeedItem): void {
    this.analytics.addEvent({
      pageType: PageType.overlay,
      pageName: 'The All New Starhub Rewards'
    });
    this.dialog.open(PopupComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: item,
      height: '85vh',
      minWidth: '35.5rem',
      maxWidth: '94vw'
    });
  }
}
