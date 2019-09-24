import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvConfig } from './env.config';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      { provide: EnvConfig, useValue: {} }
    ]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
});
