import { TestBed } from '@angular/core/testing';

import { V4SurveyService } from './v4-survey.service';

describe('V4SurveyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: V4SurveyService = TestBed.get(V4SurveyService);
    expect(service).toBeTruthy();
  });
});
