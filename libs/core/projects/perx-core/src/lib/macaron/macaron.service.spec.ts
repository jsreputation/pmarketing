import { TestBed } from '@angular/core/testing';

import { MacaronService } from './macaron.service';

describe('MacaronService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MacaronService = TestBed.get(MacaronService);
    expect(service).toBeTruthy();
  });
});
