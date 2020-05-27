import { TestBed } from '@angular/core/testing';

import { GeneralStaticDataService } from './general-static-data.service';

describe('GeneralStaticDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralStaticDataService = TestBed.get(GeneralStaticDataService);
    expect(service).toBeTruthy();
  });
});
