import { TestBed } from '@angular/core/testing';

import { SurveyService } from './survey.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../public-api';

describe('SurveyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: SurveyService = TestBed.get(SurveyService);
    expect(service).toBeTruthy();
  });
});
