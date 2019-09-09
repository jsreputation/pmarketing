/// <reference types="@types/googlemaps" />

import { Component, Input, ViewChild, OnInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ILocation } from '../ilocation';
import { GeoLocationService } from '../geolocation.service';

@Component({
  selector: 'perx-core-locations-map',
  templateUrl: './locations-map.component.html',
  styleUrls: ['./locations-map.component.scss']
})
export class LocationsMapComponent implements OnInit, OnChanges {
  @Input()
  public locations: Observable<ILocation[]>;

  public current: ILocation;

  public userMarker: google.maps.Marker;
  public markersArray: google.maps.Marker[] = [];
  public userLocation: Subject<Position> = new Subject();

  @Input()
  public key: string = null;

  @ViewChild('gmap', { static: false }) public gmapElement: ElementRef;
  private map: google.maps.Map;

  public constructor(private geoLocationService: GeoLocationService) { }

  public ngOnInit(): void {
    this.userLocation.subscribe(() => {
      this.updateLocations();
    });
    // load google map script
    this.loadScript()
      .then(() => {
        const mapProp: google.maps.MapOptions = {
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        // any click on the map should dismiss the current location
        this.map.addListener('click', () => this.current = null);
        this.geoLocationService.positions().subscribe((position: Position) => this.updateUserPosition(position));
        this.updateLocations();
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.locations) {
      this.updateLocations();
    }
  }

  private loadScript(): Promise<void> {
    // don't load it more than once.
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      return Promise.resolve();
    }
    const body: HTMLBodyElement = document.body as HTMLBodyElement;
    const script: HTMLScriptElement = document.createElement('script');
    const p = new Promise<void>((resolve) => {
      // when script is loaded, resolve the promise.
      script.addEventListener('load', () => {
        resolve();
      });
    });
    script.innerHTML = '';
    let url = 'http://maps.googleapis.com/maps/api/js';
    if (this.key) {
      url += `?key=${this.key}`;
    }

    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    return p;
  }

  private updateUserPosition(position: Position | null): void {
    if (position === null) {
      return;
    }
    const location: google.maps.LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);
    this.userLocation.next(position);

    if (!this.userMarker) {
      this.userMarker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/kml/paddle/blu-blank-lv.png',
        position: location,
        map: this.map,
      });
    } else {
      this.userMarker.setPosition(location);
    }
    this.updateBoundingBox();
  }

  public clearMarkers(): void {
    this.markersArray.forEach(item => {
      item.setMap(null);
    });
  }

  private updateLocations(): void {
    if (this.locations && this.map) {
      this.locations.subscribe(
        locations => {
          this.clearMarkers();
          locations.map(location => {
            const latLng: google.maps.LatLng = new google.maps.LatLng({ lat: location.latitude, lng: location.longitude });
            const marker = new google.maps.Marker({
              position: latLng,
              map: this.map,
              title: location.name
            });
            marker.addListener('click', () => {
              this.current = location;
            });
            marker.setClickable(true);
            marker.setCursor('pointer');
            this.markersArray.push(marker);
            return marker;
          });
          this.updateBoundingBox();
        }
      );
    }
  }

  private updateBoundingBox(): void {
    let bbox: google.maps.LatLngBounds = new google.maps.LatLngBounds();
    this.markersArray.forEach((marker: google.maps.Marker) => {
      bbox = bbox.extend(marker.getPosition());
    });
    if (this.userMarker) {
      bbox.extend(this.userMarker.getPosition());
    }
    this.map.fitBounds(bbox);
  }

  public gMapUrl(loc: ILocation): string {
    return `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
  }
}
