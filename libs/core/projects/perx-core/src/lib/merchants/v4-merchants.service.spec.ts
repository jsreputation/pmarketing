import {
  TestBed,
  fakeAsync,
  inject,
  tick
} from '@angular/core/testing';

import { V4MerchantsService } from './v4-merchants.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
// import { IMerchant } from '../merchants/models/merchants.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ITag } from './models/merchants.model';

interface IV4Merchant {
  id: number;
  name: string;
  description?: string;
  website?: string;
  tags?: ITag[];
  images?: IImage[];
  outlets?: IV4Outlet[];
}

interface IImage {
  type: string;
  url: string;
}

interface IV4Outlet {
  outlet_id: number;
  outlet_name: string;
  outlet_address1: string;
  outlet_address2?: string;
  outlet_address3?: string;
  state?: string;
  city?: string;
  shopping_mall?: string;
  postal_code?: string;
  country: string;
  tel: string;
  coordinates: { lat: number, lng: number, distance?: number, unitOfMeasure: string };
  tags?: ITag[];
}

const mockTag1: ITag = {
  id: 2,
  name: 'test'
};

const mockTag2: ITag = {
  id: 2,
  name: 'test'
};

const mockOutlet: IV4Outlet = {
  outlet_id: 2,
  outlet_name: 'test',
  outlet_address1: 'test',
  outlet_address2: 'test',
  outlet_address3: 'test',
  postal_code: 'test',
  coordinates: {
    lat: 1111,
    lng: 2222,
    distance: 3333,
    unitOfMeasure: 'km'
  },
  tel: 'test',
  country: 'test',
  tags: [ mockTag1, mockTag2 ]
};

const mockMerchant: IV4Merchant = {
  id: 1,
  name: 'test',
  description: 'test',
  website: 'test',
  outlets: [ mockOutlet ]
};

// const outlets = [mockOutlet];

describe('V4MerchantsService', () => {
  let service: V4MerchantsService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(V4MerchantsService);
  });

  it('should be created', () => {
    // const service: V4MerchantsService = TestBed.get(V4MerchantsService);
    expect(service).toBeTruthy();
  });

  it('should get all merchants', fakeAsync(inject([ HttpClient ], (http: HttpClient) => {
    const spy = jest.spyOn(service, 'getAllMerchants');
    jest.spyOn(http, 'put').mockReturnValue(of({ data: mockMerchant }));
    service.getAllMerchants().subscribe(() => {
    });
    tick();
    expect(spy).toHaveBeenCalled();
  })));

  it('should validate outlet data', () => {
    expect(V4MerchantsService.v4OutletsToOutlets([ mockOutlet ])).not.toBe(null);
  });
});
