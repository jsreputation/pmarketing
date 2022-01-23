import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  SettingsService,
  FeedItem,
  FeedItemPopupComponent,
  FeedReaderService,
  IRssFeeds,
  IRssFeedsData,
  RssFeedsPages,
  ConfigService,
} from '@perxtech/core';

import { AnalyticsService, PageType } from '../../analytics.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
})
export class NewsFeedComponent implements OnInit {
  public items: FeedItem[];
  public itemSize: number;
  public newsBeforeScroll: number[];
  public newsAfterScroll: number[];
  public showButton: boolean = true;
  public ghostFeed?: any[] = new Array(1);
  public showCarouselArrows: boolean = true;
  public isDragEvent: boolean = false;
  public isClickEvent: boolean = false;
  public carouselHeight: number = 220;
  public itemWidth: number = window.innerWidth;
  @ViewChild('itemsContainer') public itemsContainer: ElementRef;
  public activeNumber: number = 0;
  public prevNumber: number = 0;

  private initNewsFeedItems(): void {
    this.configService
      .readAppConfig()
      .pipe(
        switchMap(() => this.settingsService.getRssFeeds()),
        map((res: IRssFeeds) =>
          res.data
            ? res.data.find((feed) => feed.page === RssFeedsPages.HOME)
            : undefined
        ),
        switchMap((feedData: IRssFeedsData | undefined) => {
          if (!feedData || !feedData.url) {
            return of([] as FeedItem[]);
          }
          return this.reader.getFromUrl(feedData && feedData.url);
        })
      )
      .subscribe(
        (items) => {
          this.items = items;
          this.ghostFeed = undefined;
          this.newsAfterScroll = Array.from(
            Array(items.length > 0 ? items.length - 1 : 1).keys()
          );

          console.log('this.items: ', this.items);
        },
        () => {
          this.ghostFeed = undefined;
        }
      );
  }

  constructor(
    private reader: FeedReaderService,
    private dialog: MatDialog,
    private analytics: AnalyticsService,
    private settingsService: SettingsService,
    private configService: ConfigService
  ) {}

  public ngOnInit(): void {
    this.itemSize = window.innerWidth;
    this.initNewsFeedItems();
  }

  public feedScrolled(event: Event): void {
    const unitsScrolledPast =
      (event.target as Element).scrollLeft / window.innerWidth;
    this.activeNumber = Math.round(unitsScrolledPast);

    if (this.activeNumber > 0) {
      this.prevNumber = this.activeNumber - 1;
    }
  }

  public readMore(item: FeedItem): void {
    this.analytics.addEvent({
      pageType: PageType.overlay,
      pageName: 'The All New Starhub Rewards',
    });
    this.dialog.open(FeedItemPopupComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: { ...item, ...(this.showButton ? {} : { hideButton: true }) },
      height: '85vh',
      minWidth: '35.5rem',
      maxWidth: '94vw',
    });
  }

  public getFirstLine(text: string): string {
    const lines = text.match(/[^\r\n]+/g) || [];
    return lines && lines.length > 0 ? lines[0] : '';
  }

  public onCircleClick(isActive: boolean, index: number): void {
    const newsBeforeScroll = Array(index >= 0 ? index : 0);
    if (!isActive) {
      if (index === 0) {
        this.itemsContainer.nativeElement.scrollLeft = 0;
      } else if (index > this.activeNumber) {
        this.itemsContainer.nativeElement.scrollLeft +=
          this.itemsContainer.nativeElement.offsetWidth *
          newsBeforeScroll.length;
      } else {
        this.itemsContainer.nativeElement.scrollLeft -=
          this.itemsContainer.nativeElement.offsetWidth *
          newsBeforeScroll.length;
      }
    }
  }
}
