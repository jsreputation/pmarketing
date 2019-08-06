import { TestBed } from '@angular/core/testing';

import { GeoLocationService } from './geolocation.service';
import { Type } from '@angular/core';

describe('GeoLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoLocationService = TestBed.get<GeoLocationService>(GeoLocationService as Type<GeoLocationService>);
    expect(service).toBeTruthy();
  });
});
