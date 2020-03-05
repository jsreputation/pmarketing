import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface FeedItem {
  title: string | null;
  description: string | null;
  descriptionWithURL: string | null;
  link: string | null;
  image?: string | null;
  guid: string | null;
  pubDate: Date | null;
  hideButton?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeedReaderService {
  constructor(private http: HttpClient) { }

  public getFromUrl(url: string, useCorsProxy: boolean = true): Observable<FeedItem[]> {
    const querriedUrl = useCorsProxy ? `https://cors-proxy.perxtech.io/?url=${url}` : url;
    return this.http.get(querriedUrl, { responseType: 'text' })
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
    if (!channel) {
      return [];
    }

    // try to extract the channel image used as a default image
    const channelImg = channel.querySelector('image > url');
    const channelImgUrl = channelImg ? channelImg.textContent : null;
    const items = Array.from(channel.querySelectorAll('item'));
    return items.map((item: Element) => {
      const dateStr = item.getElementsByTagName('pubDate')[0].textContent;
      const imageTag = item.getElementsByTagName('image')[0];
      const mediaImg = item.getElementsByTagName('media:thumbnail')[0];
      const image: string | null = mediaImg ? mediaImg.getAttribute('url') : imageTag ? imageTag.textContent : channelImgUrl;
      const it: FeedItem = {
        title: item.getElementsByTagName('title')[0].textContent,
        description: item.getElementsByTagName('description')[0].textContent,
        descriptionWithURL: item.getElementsByTagName('content:encoded')[0] ? item.getElementsByTagName('content:encoded')[0].textContent : item.getElementsByTagName('description')[0].textContent,
        link: item.getElementsByTagName('link')[0].textContent,
        image,
        guid: item.getElementsByTagName('guid')[0].textContent,
        pubDate: dateStr ? new Date(dateStr) : null
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
