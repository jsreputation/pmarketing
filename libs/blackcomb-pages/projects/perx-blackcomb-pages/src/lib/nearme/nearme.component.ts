/// <reference types="@types/googlemaps" />

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';

import {
  RewardsService,
  IReward,
  IPrice,
  IVoucherLocation,
  IVoucherService,
  GeoLocationService,
  ConfigService,
  IConfig,
  ITabConfigExtended
} from '@perxtech/core';

import {
  Subject,
  from,
  iif
} from 'rxjs';
import { take, mergeMap, filter, tap, finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

export interface IData {
  categories: ICategories[];
}

export interface ICategories {
  name: string;
  isSelected: boolean;
}

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
  public upcoming: boolean = true;
  public merchantImg: boolean;
  public favoriteRewards: IReward[];
  public showRewardFavButton?: boolean;
  public categories: ICategories[] = [];
  public rad: number = 100000000;
  public firstLoad: boolean = true;
  public lastLat: number;
  public lastLng: number;
  public lastRad: number;
  public favDisabled: boolean  = false;
  @Output()
  public favoriteRewardEvent: EventEmitter<IReward> = new EventEmitter<IReward>();

  constructor(
    private config: ConfigService,
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private geoLocationService: GeoLocationService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.rewardsService.getCategories().subscribe((catagories: ITabConfigExtended[]) => {
      catagories.forEach(cat => {
        const category: ICategories = {
          name: cat.tabName,
          isSelected: false
        };
        this.categories.push(category);
      });
    });
    this.rewardsService.getAllFavoriteRewards().subscribe(
      rewards => {
        this.favoriteRewards = rewards ||  [];
      }
    );

    this.config.readAppConfig().subscribe((config: IConfig<void>) => {
      this.showRewardFavButton = config.showRewardFavButton;
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
          .pipe(take(1))
          .subscribe((position: Position) => {
            this.position = position;
            this.updateMarkers(this.position.coords.latitude, this.position.coords.longitude, this.rad);
          });
        // get user location and add marker
        this.drawCurrentLocation();
        // show button
        this.showCurrentLocationButton();
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
      url += `?key=${this.key}&libraries=geometry`;
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

  private showCurrentLocationButton(): void {
    // Set CSS & image for button
    const controlButton = document.createElement('div');
    controlButton.style.backgroundColor = '#fff';
    controlButton.style.border = '2px solid #fff';
    controlButton.style.boxShadow = '0 2px 3px rgba(0,0,0,.3)';
    controlButton.innerHTML = '<img src="assets/aim.svg" />';
    controlButton.style.padding = '5px';
    controlButton.style.height = '28px';
    controlButton.style.width = '28px';
    controlButton.style.marginRight = '10px';
    // Setup the click event listener
    controlButton.addEventListener('click', () => this.drawCurrentLocation());
    // pass custom contrl to map
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlButton);
  }

  private drawCurrentLocation(): void {
    // location from html5
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          // build postion obj
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // define and place marker
          const marker = new google.maps.Marker({
            position: pos,
            map: this.map
          });
          marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillOpacity: 1,
            strokeWeight: 2,
            fillColor: '#5384ED',
            strokeColor: '#ffffff'
          });
          // center map to user location so nearby
          this.map.setCenter(pos);
        }
      );
    }
  }

  private updateMarkers(latitude: number, longitude: number, rad: number, filterCategories?: string[]): void {
    this.lastLat = latitude;
    this.lastLng = longitude;
    this.lastRad = rad;

    this.rewardsService.nearMe(rad, latitude, longitude).pipe(
      take(1),
      mergeMap((rewards: IReward[]) =>
        from(rewards).pipe(
          mergeMap(reward => this.vouchersService.getRewardLocations(reward.id).pipe(
            mergeMap((locations: IVoucherLocation[]) =>
              from(locations).pipe(
                filter((location: IVoucherLocation) => {
                  const lat = location.latitude !== null ? parseFloat(location.latitude) : 0;
                  const lng = location.longitude !== null ? parseFloat(location.longitude) : 0;

                  if (filterCategories && filterCategories.length > 0) {
                    const tags = reward.categoryTags ? reward.categoryTags : [];
                    for (let i = 0; i < tags.length; i++) {
                      if (filterCategories.includes(tags[i].title)) {
                        return lat === 0 || lng === 0 ? false : true;
                      }
                    }
                    return false;
                  }
                  return lat === 0 || lng === 0 ? false : true;
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
                    this.merchantImg = this.current.merchantImg ? true : false;

                    const sellingFrom = this.current.sellingFrom;
                    const nowTime: number = (new Date()).getTime();
                    this.upcoming = sellingFrom && sellingFrom.getTime() > nowTime ? true : false;
                  });
                  this.markersArray.push(marker);
                })
              )
            )
          ))
        )
      )
    ).subscribe(() => {
      if (this.firstLoad) {
        this.firstLoad = false;
        this.updateBoundingBox();
      }
    });
  }

  public updateBoundingBox(): void {
    let bbox: google.maps.LatLngBounds = new google.maps.LatLngBounds();
    this.markersArray.forEach((marker: google.maps.Marker) => {
      const position = marker.getPosition();
      if (position) {
        bbox = bbox.extend(position);
      }
    });
    if (this.position) {
      const position = new google.maps.LatLng(this.position.coords.latitude, this.position.coords.longitude);
      bbox.extend(position);
    }
    this.map.fitBounds(bbox);
  }

  public searchThisArea(): void {
    this.clearMarkers();
    const bounds = this.map.getBounds();
    if (bounds) {
      const center = bounds.getCenter();
      const ne = bounds.getNorthEast();
      const lat = center.lat();
      const lng = center.lng();
      // Calculate radius (in meters).
      const radius = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(center, ne));
      this.updateMarkers(lat, lng, radius);
    }
  }

  public rewardFavoriteHandler(rewardToggled: IReward): void {
    if (this.favDisabled) {
      return;
    }

    this.favDisabled = true;

    iif(() => (rewardToggled && (rewardToggled.favorite || false)),
    this.rewardsService.unfavoriteReward(rewardToggled.id),
    this.rewardsService.favoriteReward(rewardToggled.id)).pipe(
      tap(
        reward => {
          this.current = reward;
        }
      ),
      finalize(() => setTimeout(() => {
        this.favDisabled = false;
      }, 500))
    ).subscribe();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '35rem',
      data: { categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (typeof res !== 'object') {
        return;
      }
      this.categories = res;
      this.filterLocations();
    });
  }

  public filterLocations(): void {
    this.clearMarkers();
    const filteredCategories = this.categories.filter(category => category.isSelected).map(category => category.name);
    this.updateMarkers(this.lastLat, this.lastLng, this.lastRad, filteredCategories);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
