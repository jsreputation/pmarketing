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
    getMerchant: () => of()
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
      locationService.getAllLocations(of([{ id: 1 } as IMerchant]), ['tag'])
        .subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));
});
