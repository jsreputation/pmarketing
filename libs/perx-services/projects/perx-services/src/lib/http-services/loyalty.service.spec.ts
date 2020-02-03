import { TestBed } from '@angular/core/testing';

import { LoyaltyService } from './loyalty.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoyaltyService', () => {
  const configStub: Partial<ApiConfigService> = {};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      { provide: ApiConfigService, useValue: configStub },
    ]
  }));

  it('should be created', () => {
    const service: LoyaltyService = TestBed.get(LoyaltyService);
    expect(service).toBeTruthy();
  });
});
