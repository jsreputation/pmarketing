import { TestBed } from '@angular/core/testing';

import { WhistlerMerchantsService } from './whistler-merchants.service';
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
    const service: WhistlerMerchantsService = TestBed.get(WhistlerMerchantsService);
    expect(service).toBeTruthy();
  });
});
