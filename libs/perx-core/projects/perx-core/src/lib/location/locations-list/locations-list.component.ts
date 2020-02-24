import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILocation } from '../ilocation';
import { map } from 'rxjs/operators';

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
    this.locations.pipe(
      map((locations: ILocation[]) => locations.sort((locationA, locationB) => {
        if (locationA.merchantName && locationB.merchantName) {
          if (locationA.merchantName < locationB.merchantName) {
            return -1
          }
          if (locationA.merchantName > locationB.merchantName) {
            return 1;
          }
          return 0;
        }
        return 0;
        })
    )).subscribe();
  }
}
