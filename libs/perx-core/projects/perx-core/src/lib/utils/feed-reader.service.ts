import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

export interface FeedItem {
  title: string;
  description: string;
  link: string;
  image?: string;
  guid: string;
  pubDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FeedReaderService {
  // @ts-ignore
  public getFromUrl(url: string): Observable<FeedItem[]> {
    throwError('not implemented yet');
  }

  public getFromText(feed: string): FeedItem[] {
    const parser = new DOMParser();

    // parse the dom
    const doc = parser.parseFromString(feed, 'text/xml');

    // get the first channel
    const channel = doc.querySelector('rss > channel');

    // try to extract the channel image used as a default image
    const channelImg = channel.querySelector('image > url');
    const channelImgUrl = channelImg ? channelImg.textContent : null;

    const items = Array.from(channel.querySelectorAll('item'));
    return items.map((item: Element) => {
      const imageTag = item.getElementsByTagName('image')[0];
      return {
        title: item.getElementsByTagName('title')[0].textContent,
        description: item.getElementsByTagName('description')[0].textContent,
        link: item.getElementsByTagName('link')[0].textContent,
        image: imageTag ? imageTag.textContent : channelImgUrl,
        guid: item.getElementsByTagName('guid')[0].textContent,
        pubDate: new Date(item.getElementsByTagName('pubDate')[0].textContent)
      };
    });
  }
}
