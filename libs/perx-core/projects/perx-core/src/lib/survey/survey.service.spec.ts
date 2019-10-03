import { TestBed } from '@angular/core/testing';

import { SurveyService } from './survey.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../public-api';
import { ICampaignService } from '../campaign/icampaign.service';

describe('SurveyService', () => {
  const iCampaignServiceStub = {};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      {
        provide: ICampaignService, useValue: iCampaignServiceStub
      }
    ]
  }));

  it('should be created', () => {
    const service: SurveyService = TestBed.get(SurveyService);
    expect(service).toBeTruthy();
  });
});
