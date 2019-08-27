import { TestBed } from '@angular/core/testing';

import { WhistlerAuthenticationService } from './whistler-authentication.service';

describe('WhistlerAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhistlerAuthenticationService = TestBed.get(WhistlerAuthenticationService);
    expect(service).toBeTruthy();
  });
});
