import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from '../ilocation';

@Component({
  selector: 'perx-core-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent {
  @Input()
  public locations: Observable<ILocation[]>;

  public gMapUrl(loc: ILocation): string {
    return `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
  }
}
