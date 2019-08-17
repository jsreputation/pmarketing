import { Test, TestingModule } from '@nestjs/testing';
import { EngagementController } from './engagement.controller';
import { GameService } from '../services/game/game.service';
import { SurveyService } from '../services/survey/survey.service';
import { LoyaltyService } from '../services/loyalty/loyalty.service';
import { InstantOutcomeService } from '../services/instant-outcome/instant-outcome.service';

describe('Engagement Controller', () => {
  let controller: EngagementController;
  const gameServiceStub = {};
  const loyaltyServiceStub = {};
  const irServiceStub = {};
  const surveyServiceStub = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngagementController],
      providers: [
        { provide: GameService, useValue: gameServiceStub },
        { provide: SurveyService, useValue: surveyServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: InstantOutcomeService, useValue: irServiceStub }
      ]
    }).compile();

    controller = module.get<EngagementController>(EngagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
