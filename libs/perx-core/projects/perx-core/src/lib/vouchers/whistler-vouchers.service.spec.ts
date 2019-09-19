import { TestBed } from '@angular/core/testing';

import { WhistlerVouchersService } from './whistler-vouchers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule, RewardsService } from '../../public-api';
import { of } from 'rxjs';
import { IMerchantsService } from '../merchants/imerchants.service';

describe('WhistlerVouchersService', () => {

  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: true,
    preAuth: false,
    baseHref: '/'
  };

  const rewardsServiceStub = {
    getReward: () => of()
  };

  const merchantsServiceStub = {
    getMerchant: () => of()
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({ ...environment })
    ],
    providers: [
      {
        provide: RewardsService, useValue: rewardsServiceStub
      },
      {
        provide: IMerchantsService, useValue: merchantsServiceStub
      }
    ]
  }));

  it('should be created', () => {
    const service: WhistlerVouchersService = TestBed.get(WhistlerVouchersService);
    expect(service).toBeTruthy();
  });
});
