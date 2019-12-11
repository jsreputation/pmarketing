import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { V4LocationsService } from './v4-locations.service';

import { IMerchantsService } from '../merchants/imerchants.service';
import { ConfigModule } from '../config/config.module';
import { IMerchant } from '../merchants/models/merchants.model';
import { ILocation } from './ilocation';

describe('V4LocationService', () => {
  const merchantsServiceStub = {
    getMerchant: () => of(),
    getMerchants: () => of([])
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      {
        provide: IMerchantsService, useValue: merchantsServiceStub
      }
    ]
  }));

  it('should be created', () => {
    const service: V4LocationsService = TestBed.get(V4LocationsService);
    expect(service).toBeTruthy();
  });

  it('should get all Locations', fakeAsync(inject([V4LocationsService, IMerchantsService],
    (locationService: V4LocationsService) => {

      const spy = spyOn(locationService, 'getFromMerchant').and.returnValue(of([{
        id: 1,
        name: 'test',
        latitude: 1,
        longitude: 2
      } as ILocation
      ]));
      locationService.getAllLocations(of([{ id: 1 } as IMerchant]), undefined)
        .subscribe(() => { });
      // with tags
      tick();
      locationService.getAllLocations(of([{ id: 1, tags: [{ name: 'tag', id: 1 }] } as IMerchant,
      { id: 2 } as IMerchant]), ['tag'])
        .subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('should get locatiion', fakeAsync(inject([V4LocationsService, IMerchantsService],
    (location: V4LocationsService, merchantService: IMerchantsService) => {
      const spy = spyOn(location, 'getFromMerchant').and.returnValue(of([]));
      const merchSpy = spyOn(merchantService, 'getMerchants');
      merchSpy.and.returnValue(of([]))
      location.getLocations().subscribe(() => { });
      tick();
      merchSpy.and.returnValue(of([{
        tags: [{ id: 1, name: 'test' }]
      } as IMerchant]));
      location.getLocations(1, ['test']).subscribe(() => { });
      tick();
      merchSpy.and.returnValue(of([{
        id: 1
      } as IMerchant]));
      location.getLocations(1, ['test']).subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('getFromMerchant', fakeAsync(inject([V4LocationsService, IMerchantsService],
    (location: V4LocationsService, merchantService: IMerchantsService) => {
      const spy = spyOn(merchantService, 'getMerchant').and.returnValue(of({
        outlets: [{ coordinates: { lat: 1, lng: 2 }, tags: [{ id: 1, name: 'test' }], }]
      } as IMerchant));
      location.getFromMerchant(1).subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('getTags', fakeAsync(inject([V4LocationsService], (location: V4LocationsService) => {
    location.getTags(of([{ tags: [{ name: 'test', id: 1 }] } as IMerchant]))
    .subscribe((val) => { expect(val).toEqual(['test']) });
  })));
});
