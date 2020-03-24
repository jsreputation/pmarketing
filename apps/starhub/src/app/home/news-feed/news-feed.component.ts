import {
  Component,
  OnInit,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  SettingsService,
  FeedItem, FeedItemPopupComponent,
  FeedReaderService,
  IRssFeeds,
  IRssFeedsData,
} from '@perxtech/core';

import {
  AnalyticsService,
  PageType,
} from 'src/app/analytics.service';

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
  public showButton: boolean = true;

  private async initNewsFeedItems(): Promise<void> {
    const rssFeeds: IRssFeeds = await this.settingsService.readRssFeeds().toPromise();
    if (!(rssFeeds && rssFeeds.data.length > 0)) {
      return;
    }

    const rssFeedsHome: IRssFeedsData | undefined = rssFeeds.data.find(feed => feed.page === 'home');
    if (!rssFeedsHome) {
      return;
    }

    const rssFeedsUrl: string = rssFeedsHome.url;
    this.reader.getFromUrl(rssFeedsUrl, true)
      .subscribe(items => {
        this.items = items;
        this.newsAfterScroll = Array.from(Array(items.length > 0 ? items.length - 1 : 1).keys());
      });
  }

  constructor(
    private reader: FeedReaderService,
    private dialog: MatDialog,
    private analytics: AnalyticsService,
    private settingsService: SettingsService,
  ) { }

  public ngOnInit(): void {
    this.initNewsFeedItems();
    this.itemSize = window.innerWidth;
  }

  public updateScrollIndex(index: number): void {
    this.newsBeforeScroll = Array(index >= 0 ? index : 0);
    if (this.items && this.items.length > 0 && index >= 0) {
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
    this.dialog.open(FeedItemPopupComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: { ...item, ...(this.showButton ? {} : { hideButton: true }) },
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
