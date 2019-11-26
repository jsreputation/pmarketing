import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { V4LoyaltyService } from './v4-loyalty.service';

import { ConfigModule } from '../config/config.module';

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
