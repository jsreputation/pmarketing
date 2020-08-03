/// <reference types="@types/googlemaps" />

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  RewardsService,
  IReward,
  IVoucherLocation,
  IVoucherService
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-nearme',
  templateUrl: './nearme.component.html',
  styleUrls: ['./nearme.component.scss']
})
export class NearmeComponent implements OnInit {

  @ViewChild('gmap', { static: false }) public gmapElement: ElementRef;
  public map: google.maps.Map;
  public key: string = 'AIzaSyDdNa7j6XYHHzYbzQDGTn52Rfj-wDw7X7w';
  public markersArray: google.maps.Marker[] = [];
  public current: IReward | null;

  constructor(
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService
  ) { }

  ngOnInit() {
    this.loadScript()
      .then(() => {
        const mapProp: google.maps.MapOptions = {
          center: { lat: 1.3521, lng: 103.8198 },
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.map.addListener('click', () => this.current = null);
        this.updateMarkers();
      });
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
    let url = 'https://maps.googleapis.com/maps/api/js';
    if (this.key) {
      url += `?key=${this.key}`;
    }

    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    return p;
  }

  private updateMarkers(): void {
    this.rewardsService.nearMe(10000).subscribe((rewards: IReward[]) => {
      rewards.forEach((reward: IReward) => {
        this.vouchersService.getRewardLocations(reward.id).subscribe(
          (locations: IVoucherLocation[] ) => {
            if (locations.length === 1) {
              const location: IVoucherLocation = locations[0];
              const latitude = location.latitude !== null ? parseFloat(location.latitude) : 0;
              const longitude = location.longitude !== null ? parseFloat(location.longitude) : 0;
              const latLng: google.maps.LatLng = new google.maps.LatLng({ lat: latitude, lng: longitude});
              const marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: 'Test',
                label: '50 pts'
              });
              marker.addListener('click', () => {
                this.current = reward;
                console.log(this.current);
              });
              this.markersArray.push(marker);
            }
          }
        )
      })
    });
  }
}
