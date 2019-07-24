/// <reference types="@types/googlemaps" />

import { Component, Input, ViewChild, OnInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from '../ilocation';

@Component({
  selector: 'perx-core-locations-map',
  templateUrl: './locations-map.component.html',
  styleUrls: ['./locations-map.component.scss']
})
export class LocationsMapComponent implements OnInit, OnChanges {
  @Input()
  public locations: Observable<ILocation[]>;

  public current: ILocation;

  @Input()
  public key: string = null;

  @ViewChild('gmap', { static: false }) public gmapElement: ElementRef;
  private map: google.maps.Map;

  public ngOnInit(): void {
    this.loadScript()
      .then(() => {
        const mapProp: google.maps.MapOptions = {
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        // any click on the map should dismiss the current location
        this.map.addListener('click', () => {
          this.current = null;
        });
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

  private updateLocations(): void {
    if (this.locations && this.map) {
      this.locations.subscribe(
        locations => {
          let bbox: google.maps.LatLngBounds = new google.maps.LatLngBounds();
          locations.map(location => {
            const latLng: google.maps.LatLng = new google.maps.LatLng({ lat: location.latitude, lng: location.longitude });
            bbox = bbox.extend(latLng);
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
            return marker;
          });
          this.map.fitBounds(bbox);
        }
      );
    }
  }

  public gMapUrl(loc: ILocation): string {
    return `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
  }
}
