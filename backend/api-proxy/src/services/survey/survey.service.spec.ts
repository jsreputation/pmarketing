import { Test, TestingModule } from '@nestjs/testing';
import { SurveyService } from './survey.service';
import { HttpModule } from '@nestjs/common';

describe('SurveyService', () => {
  let service: SurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyService],
      imports: [
        HttpModule
      ]
    }).compile();

    service = module.get<SurveyService>(SurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
