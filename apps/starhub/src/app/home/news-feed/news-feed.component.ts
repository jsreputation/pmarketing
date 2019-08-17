import { Component, OnInit } from '@angular/core';
import { espn } from './mockData';
import { FeedItem, FeedReaderService } from '@perx/core';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  public items: FeedItem[];

  constructor(private reader: FeedReaderService) { }

  public ngOnInit(): void {
    this.items = this.reader.getFromText(espn);
  }
}
