import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ILocation, GeoLocationService, sortByDistance } from '@perx/core';
import { locations } from '../locations.mock';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  public locations: Observable<ILocation[]>;

  constructor(private location: Location, private currentPosition: GeoLocationService) {
  }

  public ngOnInit(): void {
    this.locations = sortByDistance(this.currentPosition.positions(), of(locations), true);
  }

  public back(): void {
    this.location.back();
  }
}
