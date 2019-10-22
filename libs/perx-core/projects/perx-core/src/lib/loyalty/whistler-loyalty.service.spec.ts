import { TestBed } from '@angular/core/testing';

import { WhistlerLoyaltyService } from './whistler-loyalty.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../public-api';

describe('WhistlerLoyaltyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: WhistlerLoyaltyService = TestBed.get(WhistlerLoyaltyService);
    expect(service).toBeTruthy();
  });
});
