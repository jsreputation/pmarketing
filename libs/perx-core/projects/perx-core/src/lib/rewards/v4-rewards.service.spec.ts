import { TestBed } from '@angular/core/testing';

import { V4RewardsService } from './v4-rewards.service';

describe('RewardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: V4RewardsService = TestBed.get(V4RewardsService);
    expect(service).toBeTruthy();
  });
});
