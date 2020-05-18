import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILocation } from '../ilocation';

@Component({
  selector: 'perx-core-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {
  @Input()
  public locations: Observable<ILocation[]>;
  @Input()
  public headerFn: (location: ILocation) => Observable<string>;
  public gMapUrl(loc: ILocation): string {
    return `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
  }

  public ngOnInit(): void {
    if (!this.headerFn) {
      this.headerFn = (location) => of(location.merchantName ? location.merchantName : location.name);
    }
  }
}
