import { Component, OnInit } from '@angular/core';
import { FeedItem, FeedReaderService } from '@perx/core';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})

export class PromosComponent implements OnInit {
  public items: FeedItem[];

  constructor(private reader: FeedReaderService) {}

  public ngOnInit(): void {
    this.reader.getFromUrl('https://cdn.perxtech.io/content/starhub/rss.xml')
      .subscribe(items => this.items = items);
  }
}
