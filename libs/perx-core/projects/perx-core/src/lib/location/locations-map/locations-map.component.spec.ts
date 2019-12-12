import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { LocationsMapComponent } from './locations-map.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { Subject, of } from 'rxjs';
import { GeoLocationService } from '../geolocation.service';
import { Type } from '@angular/core';

const coords = {
  timestamp: 1333,
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
      imports: [MatCardModule, MatIconModule],
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
  beforeEach(fakeAsync(() => {
    spyOn(geolocation, 'positions').and.returnValue(of(
      coords
    ));
    component.userLocation = new Subject();
    component.locations = of([{ name: 'test', latitude: 34, longitude: 31 }]);
    tick(3000);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('updateLocations', fakeAsync(() => {
    component.userLocation.next(coords);
    tick();
    expect(component.markersArray).toBeTruthy();
  }));

  it('gMapUrl', fakeAsync(() => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coords.coords.latitude},${coords.coords.longitude}`
    expect(component.gMapUrl({
      latitude: coords.coords.latitude,
      longitude: coords.coords.longitude, name: 'test'
    }))
      .toBe(url);
      tick();
  }));

  afterAll(fakeAsync(()=>{
    component.ngOnDestroy();
    tick();
    fixture.destroy();
  }));
});
