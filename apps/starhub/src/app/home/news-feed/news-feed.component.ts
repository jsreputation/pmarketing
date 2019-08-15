import { Component, OnInit } from '@angular/core';
import { espn } from './mockData';

interface FeedItem {
  title: string;
  description: string;
  link: string;
  image?: string;
  guid: string;
  pubDate: Date;
}

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  public items: FeedItem[];

  public ngOnInit(): void {
    const parser = new DOMParser();
    const doc = parser.parseFromString(espn, 'text/xml');
    const htmlItems = Array.from(doc.getElementsByTagName('item'));
    this.items = htmlItems.map((htmlItem: Element) => {
      const imageTag = htmlItem.getElementsByTagName('image')[0];
      return {
        title: htmlItem.getElementsByTagName('title')[0].textContent,
        description: htmlItem.getElementsByTagName('description')[0].textContent,
        link: htmlItem.getElementsByTagName('link')[0].textContent,
        image: imageTag ? imageTag.textContent : undefined,
        guid: htmlItem.getElementsByTagName('guid')[0].textContent,
        pubDate: new Date(htmlItem.getElementsByTagName('pubDate')[0].textContent)
      };
    });
  }

}
