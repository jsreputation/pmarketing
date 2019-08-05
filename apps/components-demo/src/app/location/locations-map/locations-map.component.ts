import { Component } from '@angular/core';
import { ILocation } from '../../../../../../libs/perx-core/projects/perx-core/src/lib/location/ilocation';
import { BehaviorSubject } from 'rxjs';

const test1: ILocation[] = [
  {
    name: 'Title A1',
    latitude: 13.74428,
    longitude: 100.532525,
    phone: '433112',
  },
  {
    name: 'Title B1',
    latitude: 13.74428,
    longitude: 100.5564525,
    phone: '1234567',
  },
];

const test2: ILocation[] = [
  {
    name: 'Title a2',
    latitude: 13.74428,
    longitude: 100.5404525,
    phone: '22223112',
  },
  {
    name: 'Title b2',
    latitude: 13.73540,
    longitude: 100.555525,
    phone: '1222234567',
  },
];

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
