import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../public-api';
import { WhistlerInstantOutcomeService } from './whistler-instant-outcome.service';

describe('WhistlerInstantOutcomeService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: WhistlerInstantOutcomeService = TestBed.get(WhistlerInstantOutcomeService);
    expect(service).toBeTruthy();
  });
});
