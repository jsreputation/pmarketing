import { TestBed, inject } from '@angular/core/testing';

import { CheckFormTransferGuard } from './check-form-transfer.guard';

describe('CheckFormTransferGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckFormTransferGuard]
    });
  });

  it('should ...', inject([CheckFormTransferGuard], (guard: CheckFormTransferGuard) => {
    expect(guard).toBeTruthy();
  }));
});
