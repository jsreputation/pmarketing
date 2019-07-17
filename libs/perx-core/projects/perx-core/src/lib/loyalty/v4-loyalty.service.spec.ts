import { TestBed } from '@angular/core/testing';

import { V4LoyaltyService } from './v4-loyalty.service';

describe('LoyaltyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: V4LoyaltyService = TestBed.get(V4LoyaltyService);
    expect(service).toBeTruthy();
  });
});
