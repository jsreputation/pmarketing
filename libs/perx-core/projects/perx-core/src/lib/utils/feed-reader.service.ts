import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
  constructor(private http: HttpClient) { }

  public getFromUrl(url: string): Observable<FeedItem[]> {
    return this.http.get(url, { responseType: 'text' })
      .pipe(
        map((content: string) => this.getFromText(content)),
      );
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
      const it: FeedItem = {
        title: item.getElementsByTagName('title')[0].textContent,
        description: item.getElementsByTagName('description')[0].textContent,
        link: item.getElementsByTagName('link')[0].textContent,
        image: imageTag ? imageTag.textContent : channelImgUrl,
        guid: item.getElementsByTagName('guid')[0].textContent,
        pubDate: new Date(item.getElementsByTagName('pubDate')[0].textContent)
      };
      // cure the content
      for (const k in it) {
        if ((typeof it[k]) === 'string') {
          it[k] = it[k].trim();
        }
      }
      return it;
    });
  }
}
