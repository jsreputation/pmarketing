import { TestBed } from '@angular/core/testing';

import { WhistlerVouchersService } from './whistler-vouchers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule, RewardsService } from '../../public-api';

describe('WhistlerVouchersService', () => {

  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: true,
    preAuth: false,
    baseHref: '/'
  };

  const rewardsServiceStub = {
    getReward: () => { }
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({ ...environment })
    ],
    providers: [
      {
        provide: RewardsService, useValue: rewardsServiceStub
      }
    ]
  }));

  it('should be created', () => {
    const service: WhistlerVouchersService = TestBed.get(WhistlerVouchersService);
    expect(service).toBeTruthy();
  });
});
