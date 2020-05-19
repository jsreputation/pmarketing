import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { LocationsMapComponent } from './locations-map.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { Subject, of } from 'rxjs';
import { GeoLocationService } from '../geolocation.service';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';


const coords: Position = {
  timestamp: 113,
  coords: {
    latitude: 20,
    longitude: 30,
    altitude: 450,
    speed: 30,
    accuracy: 41,
    altitudeAccuracy: 5559,
    heading: 123
  }
};

const geoLocationService: Partial<GeoLocationService> = {
  positions: () => of(coords)
};

describe('LocationsMapComponent', () => {
  let component: LocationsMapComponent;
  let fixture: ComponentFixture<LocationsMapComponent>;
  let geolocation: GeoLocationService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsMapComponent],
      imports: [MatCardModule, MatIconModule, TranslateModule.forRoot()],
      providers: [
        { provide: GeoLocationService, useValue: geoLocationService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LocationsMapComponent);
    geolocation = TestBed.get<GeoLocationService>(GeoLocationService as Type<GeoLocationService>);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  it('updateLocations', fakeAsync(() => {
    jest.spyOn(geolocation, 'positions').mockReturnValue(of(coords));
    component.userLocation = new Subject();
    component.locations = of([{ name: 'test', latitude: 34, longitude: 31 }]);
    component.userLocation.next(coords);
    expect(component.markersArray).toBeTruthy();
    component.ngOnDestroy();
    tick();
  }));

  it('gMapUrl', () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coords.coords.latitude},${coords.coords.longitude}`;
    expect(component.gMapUrl({
      latitude: coords.coords.latitude,
      longitude: coords.coords.longitude, name: 'test'
    }))
      .toBe(url);
  });
});
