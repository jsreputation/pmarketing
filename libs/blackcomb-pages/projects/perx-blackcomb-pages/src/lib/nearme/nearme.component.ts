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
  GeoLocationService,
  TokenStorage,
  ConfigService,
  IConfig,
  ITabConfigExtended
} from '@perxtech/core';

import {
  Subject,
  from
} from 'rxjs';
import { take, mergeMap, filter, tap } from 'rxjs/operators';
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
  public favoriteRewards: IReward[];
  public showRewardFavButton?: boolean;
  public categories: ICategories[] = [];
  public rad: number = 100000000;
  public firstLoad: boolean = true;
  public lastLat: number;
  public lastLng: number;
  public lastRad: number;

  constructor(
    private config: ConfigService,
    private tokenStorage: TokenStorage,
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
    this.favoriteRewards = (
      this.tokenStorage.getAppInfoProperty('favoriteRewards') as unknown as IReward[]
    ) || [];

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
                    console.log(reward);
                    this.current = reward;
                    this.currentPrice = reward.rewardPrice ? reward.rewardPrice[0] : null;
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
    const favoriteRewards = this.tokenStorage.getAppInfoProperty('favoriteRewards');
    let rwdsArray;
    if (favoriteRewards) {
      // if found id remove it, if cant find add it
      const foundIndex = (favoriteRewards as unknown as IReward[]).findIndex(
        reward => reward.id === rewardToggled.id);
      if (foundIndex >= 0) {
        (favoriteRewards as unknown as IReward[]).splice(foundIndex, 1);
        rwdsArray = favoriteRewards;
      } else {
        rwdsArray = [...favoriteRewards, rewardToggled];
      }
    } else {
      rwdsArray = [rewardToggled];
    }
    this.favoriteRewards = rwdsArray;
    this.tokenStorage.setAppInfoProperty(rwdsArray, 'favoriteRewards');
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
