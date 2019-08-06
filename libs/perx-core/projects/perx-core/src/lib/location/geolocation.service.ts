import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService implements OnDestroy {
  private subject: BehaviorSubject<Position>;
  private watchId: number;

  constructor() {
    const defaultPos: Position = {
      coords: {
        accuracy: 0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 0,
        longitude: 0,
        speed: null
      },
      timestamp: Date.now()
    };
    this.subject = new BehaviorSubject<Position>(defaultPos);

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
