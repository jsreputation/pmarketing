import { TestBed } from '@angular/core/testing';

import { SessionTokenStorageService } from './session-token-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SessionTokenStorageService', () => {
  let service: SessionTokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: []
    });
    service = TestBed.inject(SessionTokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
