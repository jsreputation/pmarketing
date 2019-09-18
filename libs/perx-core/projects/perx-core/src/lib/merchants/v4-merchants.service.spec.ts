import { TestBed } from '@angular/core/testing';

import { V4MerchantsService } from './v4-merchants.service';

describe('V4MerchantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: V4MerchantsService = TestBed.get(V4MerchantsService);
    expect(service).toBeTruthy();
  });
});
