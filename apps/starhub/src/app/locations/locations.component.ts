import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {
  constructor(private location: Location) {
  }

  public back(): void {
    this.location.back();
  }
}
