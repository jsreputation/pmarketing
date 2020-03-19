import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { WhistlerMerchantsService } from './whistler-merchants.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { IMerchant } from './models/merchants.model';
import { Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import {
  IJsonApiItem,
  IJsonApiItemPayload,
  IWMerchantAttributes,
} from '@perxtech/whistler';

describe('WhistlerMerchantsService', () => {
  let httpTestingController: HttpTestingController;
  let service: WhistlerMerchantsService;
  const environment = {
    apiHost: 'https://blabla',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  const mockMerchant: IJsonApiItem<IWMerchantAttributes> = {
    id: '42',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      id: '42',
      name: '42',
      description: '42',
      properties: {
        phone: '42',
        address: '42',
        city: '42',
        state: '42',
        postal_code: '42',
        weblink: '42',
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ConfigModule.forRoot({ ...environment })
      ]
    });
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(WhistlerMerchantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a merchant from its id', (done: jest.DoneCallback) => {
    service.getMerchant(42)
      .subscribe((m: IMerchant) => {
        expect(`${m.id}`).toEqual(mockMerchant.id);
        done();
      });

    const req = httpTestingController.expectOne('https://blabla/organization/orgs/42');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiItemPayload<IWMerchantAttributes> = {
      data: mockMerchant
    };
    req.flush(res);

    httpTestingController.verify();
  });

  it('should getallmerchant', fakeAsync(inject([WhistlerMerchantsService, HttpClient],
    (merchantService: WhistlerMerchantsService, http: HttpClient) => {
      const spy = jest.spyOn(http, 'get')
        .mockReturnValue(of({ data: [mockMerchant, { ...mockMerchant, id: 5 }], meta: { page_count: 2 } }));
      merchantService.getAllMerchants().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('should getMerchants', fakeAsync(inject([WhistlerMerchantsService, HttpClient],
    (merchantService: WhistlerMerchantsService, http: HttpClient) => {
      const spy = jest.spyOn(http, 'get').mockReturnValue(of({ data: [mockMerchant], meta: {} }));
      merchantService.getMerchants().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
      spy.mockReturnValue(of({ data: [mockMerchant] }));
      merchantService.getMerchants(1).subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('should return mechant from last call', fakeAsync(inject([WhistlerMerchantsService, HttpClient],
    (merchantService: WhistlerMerchantsService, http: HttpClient) => {
      jest.spyOn(http, 'get').mockReturnValue(of({ data: [mockMerchant], meta: { page_count: 3 } }));
      merchantService.getAllMerchants().subscribe(() => { });
      tick();
      merchantService.getMerchant(42).subscribe(() => { });
      tick();
    })));
});
