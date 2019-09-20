import { TestBed } from '@angular/core/testing';

import { V4MerchantsService } from './v4-merchants.service';
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
    const service: V4MerchantsService = TestBed.get(V4MerchantsService);
    expect(service).toBeTruthy();
  });
});
