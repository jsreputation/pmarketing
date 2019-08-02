import { TestBed } from '@angular/core/testing';

import { V4LocationsService } from './v4-locations.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvConfig } from '../shared/env-config';

describe('V4LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      EnvConfig
    ]
  }));

  it('should be created', () => {
    const service: V4LocationsService = TestBed.get(V4LocationsService);
    expect(service).toBeTruthy();
  });
});
