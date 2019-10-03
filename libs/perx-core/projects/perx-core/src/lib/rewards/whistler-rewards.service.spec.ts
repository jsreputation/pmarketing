import { TestBed } from '@angular/core/testing';

import { WhistlerRewardsService } from './whistler-rewards.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { IMerchantsService } from '../merchants/imerchants.service';
import { of } from 'rxjs';

describe('WhistlerRewardsService', () => {

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
    const service: WhistlerRewardsService = TestBed.get(WhistlerRewardsService);
    expect(service).toBeTruthy();
  });
});
