import { TestBed } from '@angular/core/testing';

import { V4LocationsService } from './v4-locations.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../public-api';
import { IMerchantsService } from '../merchants/imerchants.service';

describe('V4LocationService', () => {
  const merchantsServiceStub = {};

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
