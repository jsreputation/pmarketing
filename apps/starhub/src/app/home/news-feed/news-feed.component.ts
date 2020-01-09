import {
  Component,
  OnInit,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  FeedItem,
  FeedReaderService,
} from '@perx/core';

import {
  AnalyticsService,
  PageType,
} from 'src/app/analytics.service';
import { PopupComponent } from './popup/popup.component';

import { environment } from '../../../environments/environment';

export const URL_PROD: string = 'https://cdn.perxtech.net/content/starhub/rss.xml';
export const URL = 'https://cdn.perxtech.io/content/starhub/rss.xml';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  public items: FeedItem[];
  public itemSize: number;
  public newsBeforeScroll: number[];
  public newsAfterScroll: number[];

  public get url(): string {
    return environment.production ? URL_PROD : URL;
  }

  constructor(
    private reader: FeedReaderService,
    private dialog: MatDialog,
    private analytics: AnalyticsService
  ) { }

  public ngOnInit(): void {
    this.reader.getFromUrl(this.url)
      .subscribe(items => {
        this.items = items;
        this.newsAfterScroll = Array.from(Array(items.length > 0 ? items.length - 1 : 1).keys());
      });
    this.itemSize = window.innerWidth;
  }

  public updateScrollIndex(index: number): void {
    this.newsBeforeScroll = Array(index >= 0 ? index : 0 );
    if (this.items && this.items.length > 0 && index > 0) {
      this.newsAfterScroll = Array(this.items.length - index - 1);
    } else {
      this.newsAfterScroll = [];
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.itemSize = window.innerWidth;
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

  public getFirstLine(text: string): string {
    const lines = text.match(/[^\r\n]+/g) || [];
    return lines && lines.length > 0 ? lines[0] : '';
  }
}
