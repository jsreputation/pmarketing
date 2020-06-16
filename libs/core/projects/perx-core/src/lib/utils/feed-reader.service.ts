import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBackend, HttpClient } from '@angular/common/http';
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
// https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module/49047764
@Injectable({
  providedIn: 'root',
})
export class FeedReaderService {
  private http;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
  public getFromUrl(
    url: string,
    useCorsProxy: boolean = true,
  ): Observable<FeedItem[]> {
    const querriedUrl = useCorsProxy
      ? `https://cors-proxy.perxtech.io/?url=${url}`
      : url;
    return this.http
      .get(querriedUrl, { responseType: 'text' })
      .pipe(map((content: string) => this.getFromText(content)));
  }

  public getFromText(feed: string): FeedItem[] {
    const parser = new DOMParser();
    if (feed.includes('html')) {
      // parse the dom
      const doc1 = parser.parseFromString(feed, 'text/html');

      // get the first channel
      const body = doc1.querySelector('body');

      if (!body) {
        return [];
      }

      const feedsContainer = body.querySelector('.container');

      // try to extract the hero image used as a default image
      const heroImg = body.querySelector(
        '#hero-image > img',
      ) as HTMLImageElement;
      const heroImgUrl = heroImg ? heroImg.src : null;

      // @ts-ignore
      const items1 = Array.from(feedsContainer.querySelectorAll('.row > div'));

      return items1.map((item: Element) => {
        const dateStr = item.getElementsByTagName('time')[0].textContent;
        const image = item.getElementsByTagName('img')[0].src || heroImgUrl;
        const it = {
          title: item.getElementsByTagName('h1')[0].textContent,
          description: item.getElementsByTagName('p')[0].textContent,
          descriptionWithURL: '',
          link: item.getElementsByTagName('a')[0].getAttribute('href'),
          image,
          guid: '',
          pubDate: dateStr ? new Date(dateStr) : null,
        };

        for (const k in it) {
          if (typeof it[k] === 'string') {
            it[k] = it[k].trim();
          }
        }
        return it;
      });
    }
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
      const image: string | null = mediaImg
        ? mediaImg.getAttribute('url')
        : imageTag
          ? imageTag.textContent
          : channelImgUrl;
      const it: FeedItem = {
        title: item.getElementsByTagName('title')[0].textContent,
        description: item.getElementsByTagName('description')[0].textContent,
        descriptionWithURL: item.getElementsByTagName('content:encoded')[0]
          ? item.getElementsByTagName('content:encoded')[0].textContent
          : item.getElementsByTagName('description')[0].textContent,
        link: item.getElementsByTagName('link')[0].textContent,
        image,
        guid: item.getElementsByTagName('guid')[0].textContent,
        pubDate: dateStr ? new Date(dateStr) : null,
      };
      // cure the content
      for (const k in it) {
        if (typeof it[k] === 'string') {
          it[k] = it[k].trim();
        }
      }
      return it;
    });
  }
}
