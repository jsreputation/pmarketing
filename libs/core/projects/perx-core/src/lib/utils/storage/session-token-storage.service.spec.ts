import { TestBed } from '@angular/core/testing';

import { SessionTokenStorageService } from './session-token-storage.service';

describe('SessionTokenStorageService', () => {
  let service: SessionTokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionTokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
