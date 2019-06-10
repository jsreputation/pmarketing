import { TestBed } from '@angular/core/testing';

import { PerxAuthenticationService } from './perx-authentication.service';

describe('PerxAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerxAuthenticationService = TestBed.get(PerxAuthenticationService);
    expect(service).toBeTruthy();
  });
});
