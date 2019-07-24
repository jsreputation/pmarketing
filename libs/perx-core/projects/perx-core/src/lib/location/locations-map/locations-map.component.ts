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
          center: new google.maps.LatLng(18.5793, 73.8143),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.updateLocations();
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.locations) {
      this.updateLocations();
    }
  }

  private loadScript(): Promise<void> {
    const body: HTMLBodyElement = document.body as HTMLBodyElement;
    const script: HTMLScriptElement = document.createElement('script');
    const p = new Promise<void>((resolve) => {
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
          const markers = locations.map(location => {
            const latLng: google.maps.LatLng = new google.maps.LatLng({ lat: location.latitude, lng: location.longitude });
            bbox = bbox.extend(latLng);
            return new google.maps.Marker({
              position: latLng,
              map: this.map,
              title: location.name
            });
          });
          this.map.fitBounds(bbox);
          markers.forEach(marker => marker.setClickable(true));
        }
      );
    }
  }
}
