import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { GeoLocationService } from './geolocation.service';
import { Type } from '@angular/core';

describe('GeoLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoLocationService = TestBed.get<GeoLocationService>(GeoLocationService as Type<GeoLocationService>);
    expect(service).toBeTruthy();
    // spyOn(navigator, 'geolocation');
    expect(new GeoLocationService()).toBeTruthy();
  });

  it('newPosition', fakeAsync(inject([GeoLocationService], (geolocation: GeoLocationService) => {
    const pos: Position = {
      coords: {
        accuracy: 1,
        latitude: 1,
        altitude: 1,
        altitudeAccuracy: 1,
        longitude: 1,
        speed: 1,
        heading: 1
      }, timestamp: 1
    };
    geolocation.positions().subscribe((res) => expect(res).toEqual(pos));
    geolocation.newPosition(pos);
    tick();
    geolocation.ngOnDestroy();
    // spyOnProperty(navigator, 'geolocation').mockReturnValue(null);
    geolocation.ngOnDestroy();
  })));

});
