import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IMerchantLocation, IVoucherLocation, IVoucherService, LocationsService } from '@perxtech/core';
import { switchMap, tap } from 'rxjs/operators';
import { iif } from 'rxjs';
@Component({
  selector: 'bdo-merchant-location-page',
  templateUrl: './merchant-location-page.component.html',
  styleUrls: ['./merchant-location-page.component.scss'],
})
export class MerchantLocationPageComponent implements OnInit {
  public location: IMerchantLocation[] | IVoucherLocation[];
  @ViewChild('gmap') public gmapElement: ElementRef;
  public map: google.maps.Map;
  public key = 'AIzaSyDdNa7j6XYHHzYbzQDGTn52Rfj-wDw7X7w';

  private rid: number;
  public displayMode: 'phone' | 'location';
  public markersArray: google.maps.Marker[] = [];
  private currentViewLocation = { lat: '', long: '' };
  private defaultZoom: number;

  constructor(
    private voucherService: IVoucherService,
    private locationsService: LocationsService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    const markerLocations: IVoucherLocation[] = [];
    this.loadScript().then(() => {
      this.activeRoute.params
        .pipe(
          tap(param => this.rid = param.id),
          switchMap(() => this.activeRoute.queryParams),
          tap(params => { this.displayMode = params.display === 'phone' ? params.display : 'location' }),
          switchMap((params) => iif(() => params.mode === 'campaign',
            this.locationsService.getMerchantLocationsFromCampaign(this.rid),
            this.voucherService.getRewardLocations(this.rid)
          )
          )
        )
        .subscribe((item) => {
          this.location = item;
          if (this.location) {
            if (this.location.length > 1) {
              const center = this.centerGeolocation(Array(this.location)?.map((location: any) => ({
                latitude: location.latitude,
                longitude: location.longitude
              })));
              this.currentViewLocation.lat = center?.latitude;
              this.currentViewLocation.long = center?.longitude;
              this.defaultZoom = 10;
            } else {
              this.currentViewLocation.lat = item[0]?.latitude;
              this.currentViewLocation.long = item[0]?.longitude;
              this.defaultZoom = 15;
            }

            const mapProp: google.maps.MapOptions = {
              center: {
                lat: parseFloat(this.currentViewLocation.lat),
                lng: parseFloat(this.currentViewLocation.long),
              },
              zoom: this.defaultZoom,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              disableDefaultUI: true,
            };
            this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

            this.location.forEach((location: IMerchantLocation | IVoucherLocation) => {
              markerLocations.push({
                id: location.id,
                name: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
              })
            })
            this.updateMarkers(markerLocations);
          }
        });
    });
  }

  navigateGoogleMaps(lat, lng) {
    const queryParams: Params = { lat: lat, long: lng };
    this.router.navigate([`treat-welcome/${this.rid}/location/map`], {
      queryParams: queryParams
    });
  }

  public navToGmaps() {
    // window.open( ` https://www.google.com/maps/search/?api=1&query=${this.currentViewLocation.lat},${this.currentViewLocation.long}`, "_blank");
  }

  public navToWaze() {
    // window.open( `https://waze.com/ul?ll=${this.currentViewLocation.lat},${this.currentViewLocation.long}&z=10`, "_blank");
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

  private centerGeolocation(coords: any) {
    if (coords.length === 1) {
      return coords[0];
    }

    let x = 0.0;
    let y = 0.0;
    let z = 0.0;

    for (const coord of coords) {
      const latitude = coord.latitude * Math.PI / 180;
      const longitude = coord.longitude * Math.PI / 180;

      x += Math.cos(latitude) * Math.cos(longitude);
      y += Math.cos(latitude) * Math.sin(longitude);
      z += Math.sin(latitude);
    }

    const total = coords.length;

    x = x / total;
    y = y / total;
    z = z / total;

    const centralLongitude = Math.atan2(y, x);
    const centralSquareRoot = Math.sqrt(x * x + y * y);
    const centralLatitude = Math.atan2(z, centralSquareRoot);

    return {
      latitude: centralLatitude * 180 / Math.PI,
      longitude: centralLongitude * 180 / Math.PI
    };
  }

}
