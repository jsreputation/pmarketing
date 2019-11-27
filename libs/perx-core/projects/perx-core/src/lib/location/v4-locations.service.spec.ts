import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { V4LocationsService } from './v4-locations.service';

import { IMerchantsService } from '../merchants/imerchants.service';
import { ConfigModule } from '../config/config.module';

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
});
