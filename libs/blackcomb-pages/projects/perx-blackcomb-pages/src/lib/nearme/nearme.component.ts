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
  Subject,
  from
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
  public position: Position;

  constructor(
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private geoLocationService: GeoLocationService
  ) { }

  public ngOnInit(): void {

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
            this.position = position;
          });
        this.updateMarkers(this.position);
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


  public clearMarkers(): void {
    this.markersArray.forEach(item => {
      item.setMap(null);
    });
  }

  private updateMarkers(position: Position): void {
    if (!position) {
      return;
    }

    const rad = 10000;
    this.rewardsService.nearMe(rad, position).pipe(
      takeUntil(this.destroy$),
      mergeMap((rewards: IReward[]) =>
        from(rewards).pipe(
          mergeMap(reward => this.vouchersService.getRewardLocations(reward.id).pipe(
            mergeMap((locations: IVoucherLocation[]) =>
              from(locations).pipe(
                filter((location: IVoucherLocation) => {
                  const lat = location.latitude !== null ? parseFloat(location.latitude) : 0;
                  const lng = location.longitude !== null ? parseFloat(location.longitude) : 0;
                  if (lat === 0 || lng === 0) {
                    return false;
                  }
                  return this.isNearMe(rad, lat, lng);
                }),
                tap((location: IVoucherLocation) => {
                  const lat = location.latitude !== null ? parseFloat(location.latitude) : 0;
                  const lng = location.longitude !== null ? parseFloat(location.longitude) : 0;
                  const latLng: google.maps.LatLng = new google.maps.LatLng({ lat, lng });
                  const marker = new google.maps.Marker({
                    position: latLng,
                    map: this.map,
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
