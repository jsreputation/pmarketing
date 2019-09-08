import { Component, OnInit, HostListener } from '@angular/core';
import { FeedItem, FeedReaderService } from '@perx/core';
import { MatDialog } from '@angular/material';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  public items: FeedItem[];
  public itemSize: number;
  public activeDot: string = 'first';
  public scrolledValue: number;

  constructor(private reader: FeedReaderService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.reader.getFromUrl('https://cdn.perxtech.io/content/starhub/rss.xml')
      .subscribe(items => this.items = items);
    this.itemSize = window.innerWidth;
  }

  public getIndex(index: number): void {
    if (!this.items || this.items.length === 0) {
      this.scrolledValue = 50;
      return;
    }
    this.scrolledValue = (index + 1 / this.items.length) * 100;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.itemSize = window.innerWidth;
  }

  public readMore(item: FeedItem): void {
    this.dialog.open(PopupComponent, { data: item });
  }
}
