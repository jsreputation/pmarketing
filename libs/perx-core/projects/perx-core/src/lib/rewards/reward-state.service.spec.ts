import { TestBed } from '@angular/core/testing';

import { RewardStateService } from './reward-state.service';

describe('RewardStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RewardStateService = TestBed.get(RewardStateService);
    expect(service).toBeTruthy();
  });
});
