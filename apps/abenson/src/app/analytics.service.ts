import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export enum PageType {
  landingPage = 'landing page',
  sectionLanding = 'section landing',
  detailPage = 'detail page',
  static = 'static',
  overlay = 'overlay',
  errorPage = 'error page'
}
export interface IEvent {
  pageType: PageType;
  pageName: string;
  siteSectionLevel2?: string;
  siteSectionLevel3?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private subject: Subject<IEvent> = new Subject<IEvent>();

  public get events$(): Observable<IEvent> {
    return this.subject;
  }

  public addEvent(ev: IEvent): void {
    this.subject.next(ev);
  }
}
