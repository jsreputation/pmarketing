import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ILocation, GeoLocationService, sortByDistance, LocationsService } from '@perx/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  public locations: Observable<ILocation[]>;

  constructor(
    private location: Location,
    private currentPosition: GeoLocationService,
    private locationService: LocationsService,
    private activeRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      ((params: Params) => {
        if (params.mid) {
          const mid = params.mid;
          this.locations = sortByDistance(
            this.currentPosition.positions(),
            this.locationService.getFromMerchant(mid),
            true
          );
        }
      })
    );
  }

  public back(): void {
    this.location.back();
  }
}
