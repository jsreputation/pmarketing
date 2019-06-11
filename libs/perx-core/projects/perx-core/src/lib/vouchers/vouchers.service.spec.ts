import { TestBed } from '@angular/core/testing';

import { VouchersService } from './vouchers.service';

describe('VouchersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VouchersService = TestBed.get(VouchersService);
    expect(service).toBeTruthy();
  });
});
