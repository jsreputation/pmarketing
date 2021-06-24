import { TestBed } from '@angular/core/testing';

import { V4TeamsService } from './v4-teams.service';

describe('V4TeamsService', () => {
  let service: V4TeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(V4TeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
