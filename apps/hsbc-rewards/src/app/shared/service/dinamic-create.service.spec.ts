import { TestBed } from '@angular/core/testing';

import { DinamicCreateService } from './dinamic-create.service';

describe('DinamicCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DinamicCreateService = TestBed.get(DinamicCreateService);
    expect(service).toBeTruthy();
  });
});
