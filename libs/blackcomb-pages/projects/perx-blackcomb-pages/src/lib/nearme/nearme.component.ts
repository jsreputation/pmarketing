/// <reference types="@types/googlemaps" />

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  RewardsService,
  IReward,
  IPrice,
  IVoucherLocation,
  IVoucherService,
  GeoLocationService
} from '@perxtech/core';

import {
  Subject, from
} from 'rxjs';
import { takeUntil, mergeMap, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-nearme',
  templateUrl: './nearme.component.html',
  styleUrls: ['./nearme.component.scss']
})
export class NearmeComponent implements OnInit, OnDestroy {

  @ViewChild('gmap', { static: false }) public gmapElement: ElementRef;
  public map: google.maps.Map;
  public key: string = 'AIzaSyDdNa7j6XYHHzYbzQDGTn52Rfj-wDw7X7w';
  public markersArray: google.maps.Marker[] = [];
  public current: IReward | null;
  public currentPrice: IPrice | null;
  private destroy$: Subject<void> = new Subject();
  public userLocation: Subject<Position> = new Subject();
  public userMarker: google.maps.Marker;
  public position: Position;

  constructor(
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private geoLocationService: GeoLocationService
  ) { }

  public ngOnInit(): void {
    this.userLocation
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateMarkers();
      });

    this.loadScript()
      .then(() => {
        const mapProp: google.maps.MapOptions = {
          center: { lat: 1.3521, lng: 103.8198 },
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.map.addListener('click', () => this.current = null);
        this.geoLocationService.positions()
          .pipe(takeUntil(this.destroy$))
          .subscribe((position: Position) => {
            this.updateUserPosition(position);
            this.position = position;
          });
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

  private isNearMe(radius: number, latitude: number, longitude: number): boolean {
    const rad = function(x: number) {
      return x * Math.PI / 180;
    };
    const earthRadius = 6378137;
    const dLat = rad(this.position.coords.latitude - latitude);
    const dLong = rad(this.position.coords.longitude - longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(latitude)) * Math.cos(rad(this.position.coords.latitude)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = earthRadius * c;
    if (d <= radius) {
      return true;
    }
    return false;
  }

  public clearMarkers(): void {
    this.markersArray.forEach(item => {
      item.setMap(null);
    });
  }

  private updateMarkers(): void {
    const rad = 10000
    this.rewardsService.nearMe(rad, this.position).pipe(
      takeUntil(this.destroy$),
      mergeMap((rewards: IReward[]) => 
        from(rewards).pipe(
          mergeMap(reward => this.vouchersService.getRewardLocations(reward.id).pipe(
            mergeMap((locations: IVoucherLocation[]) => 
              from(locations).pipe(
                filter((location: IVoucherLocation) => {
                  const lat = location.latitude !== null ? parseFloat(location.latitude) : 0;
                  const lng = location.longitude !== null ? parseFloat(location.longitude) : 0;
                  if (lat === 0 || lng === 0) return false;
                  return this.isNearMe(rad, lat, lng);
                }),
                tap((location: IVoucherLocation) => {
                  const lat = location.latitude !== null ? parseFloat(location.latitude) : 0;
                  const lng = location.longitude !== null ? parseFloat(location.longitude) : 0;
                  const latLng: google.maps.LatLng = new google.maps.LatLng({ lat, lng });
                  const marker = new google.maps.Marker({
                    position: latLng,
                    map: this.map,
                    title: 'Test',
                    label: '50 pts'
                  });
                  marker.addListener('click', () => { 
                    this.current = reward;
                    this.currentPrice = reward.rewardPrice ? reward.rewardPrice[0] : null;
                  });
                  this.markersArray.push(marker);
                  this.updateBoundingBox();
                  console.log(reward);
                })
              )
            )
          ))
        )
      )
    ).subscribe();
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
        icon: 'https://maps.google.com/mapfiles/kml/paddle/blu-blank-lv.png',
        position: location,
        map: this.map,
      });
    } else {
      this.userMarker.setPosition(location);
    }
    this.updateBoundingBox();
  }

  public updateBoundingBox(): void {
    let bbox: google.maps.LatLngBounds = new google.maps.LatLngBounds();
    this.markersArray.forEach((marker: google.maps.Marker) => {
      const position = marker.getPosition();
      if (position) {
        bbox = bbox.extend(position);
      }
    });
    if (this.userMarker) {
      const position = this.userMarker.getPosition();
      if (position) {
        bbox.extend(position);
      }
    }
    this.map.fitBounds(bbox);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
