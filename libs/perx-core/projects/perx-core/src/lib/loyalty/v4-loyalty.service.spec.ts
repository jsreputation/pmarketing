import { TestBed } from '@angular/core/testing';

import { V4LoyaltyService } from './v4-loyalty.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../public-api';

describe('LoyaltyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: V4LoyaltyService = TestBed.get(V4LoyaltyService);
    expect(service).toBeTruthy();
  });
});
