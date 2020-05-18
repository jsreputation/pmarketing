import { TestBed } from '@angular/core/testing';

import { WhistlerMerchantAdminService } from './whistler-merchant-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';

describe('WhistlerMerchantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: WhistlerMerchantAdminService = TestBed.get(WhistlerMerchantAdminService);
    expect(service).toBeTruthy();
  });
});
