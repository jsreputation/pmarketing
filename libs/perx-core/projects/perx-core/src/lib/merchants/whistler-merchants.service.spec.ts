import { TestBed } from '@angular/core/testing';

import { WhistlerMerchantsService } from './whistler-merchants.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { IMerchant } from './models/merchants.model';
import { IJsonApiItem, IJsonApiItemPayload } from '../jsonapi.payload';
import { IMerchant as IWMerchant } from '@perx/whistler';
import { Type } from '@angular/core';

fdescribe('WhistlerMerchantsService', () => {
  let httpTestingController: HttpTestingController;
  let service: WhistlerMerchantsService;
  const environment = {
    apiHost: 'https://blabla',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  const mockMerchant: IJsonApiItem<IWMerchant> = {
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

  it('should get a merchant from its id', (done: DoneFn) => {
    service.getMerchant(42)
      .subscribe((m: IMerchant) => {
        expect(`${m.id}`).toEqual(mockMerchant.id);
        done();
      });

    const req = httpTestingController.expectOne('https://blabla/organization/orgs/42');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiItemPayload<IWMerchant> = {
      data: mockMerchant
    };
    req.flush(res);

    httpTestingController.verify();
  });
});
