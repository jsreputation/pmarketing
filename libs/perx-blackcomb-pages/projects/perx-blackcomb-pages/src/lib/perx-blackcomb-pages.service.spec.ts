import { TestBed } from '@angular/core/testing';

import { PerxBlackcombPagesService } from './perx-blackcomb-pages.service';

describe('PerxBlackcombPagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerxBlackcombPagesService = TestBed.get(PerxBlackcombPagesService);
    expect(service).toBeTruthy();
  });
});
