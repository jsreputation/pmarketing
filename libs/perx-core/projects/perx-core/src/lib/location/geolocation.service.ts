import { Injectable, OnDestroy } from '@angular/core';
import {Observable,  ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService implements OnDestroy {
  private subject: ReplaySubject<Position>;
  private watchId: number;

  constructor() {
    this.subject = new ReplaySubject<Position>(1);

    this.newPosition = this.newPosition.bind(this);

    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(this.newPosition);
      navigator.geolocation.getCurrentPosition(this.newPosition);
    }
  }

  public positions(): Observable<Position> {
    return this.subject;
  }

  public newPosition(pos: Position): void {
    this.subject.next(pos);
  }

  public ngOnDestroy(): void {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }
}
