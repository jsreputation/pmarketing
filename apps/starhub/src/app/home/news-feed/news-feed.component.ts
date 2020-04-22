import {
  Component,
  OnInit,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  SettingsService,
  FeedItem,
  FeedItemPopupComponent,
  FeedReaderService,
  IRssFeeds,
  IRssFeedsData,
  RssFeedsPages,
} from '@perxtech/core';

import {
  AnalyticsService,
  PageType,
} from '../../analytics.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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

  private initNewsFeedItems(): void {
    this.settingsService.getRssFeeds().pipe(
      map((res: IRssFeeds) => res.data ? res.data.find(feed => feed.page === RssFeedsPages.HOME) : undefined),
      switchMap((feedData: IRssFeedsData | undefined) => {
        if (!feedData || !feedData.url) {
          return of([] as FeedItem[]);
        }
        return this.reader.getFromUrl(feedData && feedData.url);
      })
    ).subscribe(items => {
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
