import { TestBed } from '@angular/core/testing';

import { V4InstantOutcomeService } from './v4-instant-outcome.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../public-api';

describe('V4InstantOutcomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: V4InstantOutcomeService = TestBed.get(V4InstantOutcomeService);
    expect(service).toBeTruthy();
  });
});
