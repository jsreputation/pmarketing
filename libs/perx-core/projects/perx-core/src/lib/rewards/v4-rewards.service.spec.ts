import { TestBed } from '@angular/core/testing';

import { V4RewardsService } from './v4-rewards.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvConfig } from '../rewards/env-config';

describe('V4RewardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      EnvConfig,
    ]
  }));

  it('should be created', () => {
    const service: V4RewardsService = TestBed.get(V4RewardsService);
    expect(service).toBeTruthy();
  });
});
