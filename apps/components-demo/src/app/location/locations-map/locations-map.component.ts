import { Component } from '@angular/core';
import { ILocation } from '../../../../../../libs/perx-core/projects/perx-core/src/lib/location/ilocation';
import { BehaviorSubject } from 'rxjs';
import { test1, test2 } from '../mock';

@Component({
  selector: 'app-locations-map',
  templateUrl: './locations-map.component.html',
})
export class LocationsMapComponent {

  public currentList: string = 'list1';
  public key: string = `AIzaSyDdNa7j6XYHHzYbzQDGTn52Rfj-wDw7X7w`;
  public locations: BehaviorSubject<ILocation[]> = new BehaviorSubject(test1);

  public onChange(newValue: string): void {
    this.currentList = newValue;
    if (this.currentList === 'list1') {
      this.locations.next(test1);
    } else if (this.currentList === 'list2') {
      this.locations.next(test2);
    }
  }
}
