import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IVoucherLocation } from '@perxtech/core';

@Component({
  selector: 'bdo-location-landing',
  templateUrl: './location-landing.component.html',
  styleUrls: ['./location-landing.component.scss'],
})
export class LocationLandingComponent implements OnInit {
  @ViewChild('gmap') public gmapElement: ElementRef;
  public map: google.maps.Map;
  public key = 'AIzaSyDdNa7j6XYHHzYbzQDGTn52Rfj-wDw7X7w';

  public markersArray: google.maps.Marker[] = [];
  locations: IVoucherLocation[] = [];

  constructor(private activeRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.loadScript().then(() => {
      this.activeRoute.queryParams.subscribe((param) => {
        const { lat = '', long = '' } = param;
        const mapProp: google.maps.MapOptions = {
          center: {
            lat: parseFloat(lat),
            lng: parseFloat(long),
          },
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.updateMarkers([
          {
            id: this.activeRoute.snapshot.params.rid,
            name: '',
            latitude: lat,
            longitude: long,
          },
        ]);
      });
    });
  }

  private updateMarkers(locations: IVoucherLocation[]): void {
    this.markersArray = locations.map((location) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng({
          lat: parseFloat(location.latitude),
          lng: parseFloat(location.longitude),
        }),
      });

      // marker.addListener('click', () => {});
      marker.setIcon('assets/images/marker.svg');
      return marker;
    });
    this.renderMarkers();
  }

  public renderMarkers(): void {
    this.markersArray.forEach((marker: google.maps.Marker) => {
      marker.setMap(this.map);
    });
  }

  private loadScript(): Promise<void> {
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      return Promise.resolve();
    }
    const body: HTMLBodyElement = document.body as HTMLBodyElement;
    const script: HTMLScriptElement = document.createElement('script');
    const loadingPromise = new Promise<void>((resolve) => {
      script.addEventListener('load', () => {
        resolve();
      });
    });
    script.innerHTML = '';
    let url = 'https://maps.googleapis.com/maps/api/js';
    if (this.key) {
      url += `?key=${this.key}&libraries=geometry`;
    }
    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    return loadingPromise;
  }
}
