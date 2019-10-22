import { TestBed } from '@angular/core/testing';

import { WhistlerLoyaltyService } from './whistler-loyalty.service';

describe('WhistlerLoyaltyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhistlerLoyaltyService = TestBed.get(WhistlerLoyaltyService);
    expect(service).toBeTruthy();
  });
});
