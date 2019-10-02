import { TestBed } from '@angular/core/testing';

import { V4MerchantAdminService } from './v4-merchant-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';

describe('V4MerchantsService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: V4MerchantAdminService = TestBed.get(V4MerchantAdminService);
    expect(service).toBeTruthy();
  });
});
