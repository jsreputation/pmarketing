import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
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

  @ViewChild('itemsContainer') public itemsContainer: ElementRef;
  public activeNumber: number = 0;

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
    let scrollTimer: any = null;
    const unitsScrolledPast =
      (event.target as Element).scrollLeft / window.innerWidth;
    const activeNumber = Math.round(unitsScrolledPast);

    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      this.activeNumber = activeNumber;
    }, 250);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.itemSize = window.innerWidth;
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
    const elem = this.itemsContainer.nativeElement;
    if (!isActive) {
      if (index === 0) {
        elem.scrollLeft = 0;
      } else if (index === 1) {
        index > this.activeNumber
          ? (elem.scrollLeft += elem.offsetWidth)
          : (elem.scrollLeft -= elem.offsetWidth * this.activeNumber);
      } else if (index === 2) {
        index > this.activeNumber
          ? (elem.scrollLeft += elem.offsetWidth * 2)
          : (elem.scrollLeft -= elem.offsetWidth * 2);
      } else if (index === 3) {
        index > this.activeNumber
          ? (elem.scrollLeft += elem.offsetWidth * 3)
          : (elem.scrollLeft -= elem.offsetWidth * 3);
      } else {
        elem.scrollLeft = 0;
      }
    }
  }
}
