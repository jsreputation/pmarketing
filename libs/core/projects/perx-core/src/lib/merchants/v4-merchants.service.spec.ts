import { TestBed,fakeAsync, inject, tick } from '@angular/core/testing';

import { V4MerchantsService } from './v4-merchants.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
// import { IMerchant } from '../merchants/models/merchants.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

interface IMerchant {
  id: number;
  name: string;
  description?: string;
  website?: string;
  tags?: ITag[];
  images?: IImage[];
  outlets?: IOutlet[] | null;
}
interface ITag {
  id: number;
  name: string;
}

interface IImage {
  type: string;
  url: string;
}

interface IOutlet {
  outletId: number;
  outletName: string;
  outletAddress1: string;
  outletAddress2?: string;
  outletAddress3?: string;
  postalCode?: string;
  tel: string;
  coordinates: { lat: number, lng: number, distance?: number, unitOfMeasure: string };
  tags?: ITag[];
}

const mockMerchant: IMerchant = {
  id: 1,
  name: 'test',
  description: 'test',
  website: 'test',
  outlets: null
};

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

  it('should get all merchants', fakeAsync(inject([HttpClient], (http: HttpClient) =>{
    const spy = jest.spyOn(service,'getAllMerchants')
    jest.spyOn(http, 'put').mockReturnValue(of({ data: mockMerchant }));
    service.getAllMerchants().subscribe(() => {});
    tick();
    expect(spy).toHaveBeenCalled();
  })));
});
