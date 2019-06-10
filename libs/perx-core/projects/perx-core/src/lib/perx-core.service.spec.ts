import { TestBed } from '@angular/core/testing';

import { PerxCoreService } from './perx-core.service';

describe('PerxCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerxCoreService = TestBed.get(PerxCoreService);
    expect(service).toBeTruthy();
  });
});
