import { Component, OnInit, HostListener } from '@angular/core';
import { espn } from './mockData';
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
    this.items = this.reader.getFromText(espn);
    this.itemSize = window.innerWidth;
  }

  public getIndex(index: number): void {
    const adjustedIndex = index + 1;
    const percent = (adjustedIndex / this.items.length) * 100;
    this.scrolledValue = percent;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.itemSize = window.innerWidth;
  }
}
