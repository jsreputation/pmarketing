import { TestBed } from '@angular/core/testing';

import { WhistlerVouchersService } from './whistler-vouchers.service';

describe('WhistlerVouchersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhistlerVouchersService = TestBed.get(WhistlerVouchersService);
    expect(service).toBeTruthy();
  });
});
