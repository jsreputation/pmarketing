import { TestBed } from '@angular/core/testing';

import { FlagLocalStorageService } from './flag-local-storage.service';

describe('FlagLocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlagLocalStorageService = TestBed.get(FlagLocalStorageService);
    expect(service).toBeTruthy();
  });
});
