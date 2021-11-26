import { map, mergeAll, mergeMap, toArray } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TaggedItemComponent } from './../../../shared/components/tagged-item/tagged-item.component';
import {
  Component,
  ElementRef,
  Input, OnChanges,
  ViewChild
} from '@angular/core';
import {
  IReward,
  IVoucherLocation,
  IVoucherService
} from '@perxtech/core';
import { IRewardLocationModel } from '../../../models/reward-locations.model';
import { IListItemModel } from '../../../shared/models/list-item.model';
import { mapRewardsToListItem } from '../../../shared/utilities/mapping.util';
export interface IPosition {
  lng: number;
  lat: number;
}

@Component({
  selector: 'bdo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() rewards: IReward[] = [];
  @Input() currentPosition: IPosition;
  @ViewChild('gmap') public gmapElement: ElementRef;
  @ViewChild('taggedItem') public taggedItem: TaggedItemComponent;
  public map: google.maps.Map;
  public key = 'AIzaSyDdNa7j6XYHHzYbzQDGTn52Rfj-wDw7X7w';

  public markersArray: google.maps.Marker[] = [];
  public rad = 5000;
  nearbyRewards: IListItemModel[] = [];
  locations: IVoucherLocation[] = [];
  rewardLocations: IRewardLocationModel[] = [];
  constructor(private vouchersService: IVoucherService) {}

  ngOnChanges(): void {
    this.loadScript().then(() => {
      const mapProp: google.maps.MapOptions = {
        center: {
          lat: this.currentPosition.lat,
          lng: this.currentPosition.lng,
        },
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      this.getRewardNearBy().subscribe((rewardLocations) => {
        this.rewardLocations = rewardLocations;
        this.nearbyRewards = mapRewardsToListItem(rewardLocations.map((item) => {
          return { ...item.reward, subtitle: '' };
        })).sort((firstNearbyReward, secondsNearbyReward)=>{
          return  parseFloat(firstNearbyReward.position) - parseFloat(secondsNearbyReward.position);
        });
        rewardLocations.map((item) => {
          this.locations = this.locations.concat(item.locations);
        });
        this.updateMarkers();
      });

      this.drawCurrentLocation();
    });
  }

  getRewardNearBy(): Observable<IRewardLocationModel[]> {
    return of(this.rewards || []).pipe(
      mergeAll(),
      mergeMap((reward: IReward) => {
        return this.vouchersService.getRewardLocations(reward.id).pipe(
          map((rewardLocations: IVoucherLocation[]) => {
            return { reward: reward, locations: rewardLocations };
          })
        );
      }),
      toArray()
    );
  }

  private updateMarkers(): void {
    of(this.locations)
      .pipe(
        map((locations) =>
          locations
            .filter(this.isValidLocation)
            .filter(this.isWithinCurrentLocationRange.bind(this))
        )
      )
      .subscribe((locations) => {
        this.markersArray = locations.map((location) => {
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng({
              lat: parseFloat(location.latitude),
              lng: parseFloat(location.longitude),
            }),
          });

          marker.addListener('click', () => {
            if (this.taggedItem) {
              const itemIndex = this.rewardLocations.findIndex((item) => {
                return (
                  item.locations.findIndex((loca) => loca.id === location.id) >=
                  0
                );
              });
              this.taggedItem.goToItemIndex(itemIndex ? itemIndex : 0);
            }
          });
          marker.setIcon('assets/images/marker.svg');
          return marker;
        });
        this.renderMarkers();
      });
  }

  private drawCurrentLocation(): void {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.currentPosition),
      map: this.map,
    });
    marker.setIcon({
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillOpacity: 1,
      strokeWeight: 2,
      fillColor: '#5384ED',
      strokeColor: '#ffffff',
    });
    this.map.setCenter(this.currentPosition);
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

  private isValidLocation(location) {
    const lat = location.latitude !== null ? parseFloat(location.latitude) : 0;
    const lng =
      location.longitude !== null ? parseFloat(location.longitude) : 0;
    return lat !== 0 && lng !== 0;
  }

  private isWithinCurrentLocationRange(location) {
    const markerLocation: google.maps.LatLng = new google.maps.LatLng({
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude),
    });
    const currentLocation: google.maps.LatLng = new google.maps.LatLng({
      lat: this.currentPosition.lat,
      lng: this.currentPosition.lng,
    });
    return (
      google.maps.geometry.spherical.computeDistanceBetween(
        markerLocation,
        currentLocation
      ) < this.rad
    );
  }
}
