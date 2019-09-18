import { TestBed } from '@angular/core/testing';

import { WhistlerMerchantsService } from './whistler-merchants.service';

describe('WhistlerMerchantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhistlerMerchantsService = TestBed.get(WhistlerMerchantsService);
    expect(service).toBeTruthy();
  });
});
