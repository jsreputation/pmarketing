import { Component, Input, HostListener, OnInit } from '@angular/core';
import { FeedItem, FeedReaderService } from '../feed-reader.service';
import { MatDialog } from '@angular/material';
import { IRssFeeds, IRssFeedsData } from '../../settings/models/settings.model';
import { SettingsService } from '../../settings/settings.service';
import { FeedItemPopupComponent } from '../feed-item-popup/feed-item-popup.component';

@Component({
  selector: 'perx-core-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
  // will be passed down to the dialog from readMoreClicked
  @Input()
  public page: string;

  public items: FeedItem[];
  public itemSize: number;
  public newsBeforeScroll: number[];
  public newsAfterScroll: number[];
  public showButton: boolean = true;

  private async initNewsFeedItems(): Promise<void> {
    const rssFeeds: IRssFeeds = await this.settingsService.readRssFeedsFromAPI().toPromise();
    if (!(rssFeeds && rssFeeds.data.length > 0)) {
      return;
    }

    const rssFeedsSection: IRssFeedsData | undefined = rssFeeds.data.find(feed => feed.page === this.page);
    if (!rssFeedsSection) {
      return;
    }

    const rssFeedsUrl: string = rssFeedsSection.url;
    this.reader.getFromUrl(rssFeedsUrl, true)
      .subscribe(items => {
        this.items = items;
        this.newsAfterScroll = Array.from(Array(items.length > 0 ? items.length - 1 : 1).keys());
      });
  }

  constructor(
    private reader: FeedReaderService,
    private dialog: MatDialog,
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

  @HostListener('window:resize')
  public onResize(): void {
    this.itemSize = window.innerWidth;
  }

  public readMore(item: FeedItem): void {
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
    const firstLineContent = lines && lines.length > 0 ? lines[0] : '';
    return firstLineContent.length > 120 ? `${firstLineContent.slice(0, 120)}...` : firstLineContent;
  }

}
