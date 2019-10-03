import { TestBed } from '@angular/core/testing';

import { DynamicCreateService } from './dynamic-create.service';

describe('DynamicCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DynamicCreateService]
  }));

  it('should be created', () => {
    const service: DynamicCreateService = TestBed.get(DynamicCreateService);
    expect(service).toBeTruthy();
  });
});
