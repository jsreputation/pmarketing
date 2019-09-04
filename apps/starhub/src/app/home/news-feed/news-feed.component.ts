import { Component, OnInit, HostListener } from '@angular/core';
import { FeedItem, FeedReaderService } from '@perx/core';

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

  constructor(private reader: FeedReaderService) { }

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
}
