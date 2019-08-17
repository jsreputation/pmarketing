import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ILocation } from '@perx/core';
import { locations } from '../locations.mock';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {
  public locations: ILocation[];

  constructor(private location: Location) {
    this.locations = locations;
  }

  public back(): void {
    this.location.back();
  }
}
