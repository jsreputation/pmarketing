import { TestBed } from '@angular/core/testing';

import { RedemptionService } from './redemption.service';

describe('RedemptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedemptionService = TestBed.get(RedemptionService);
    expect(service).toBeTruthy();
  });
});
