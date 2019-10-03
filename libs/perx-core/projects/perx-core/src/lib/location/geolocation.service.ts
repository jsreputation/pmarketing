import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService implements OnDestroy {
  private subject: BehaviorSubject<Position | null>;
  private watchId: number;

  constructor() {
    this.subject = new BehaviorSubject<Position>(null);

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
