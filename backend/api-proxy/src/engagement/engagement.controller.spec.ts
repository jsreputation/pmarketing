import { Test, TestingModule } from '@nestjs/testing';
import { EngagementController } from './engagement.controller';
import { GameService } from '../services/game/game.service';

describe('Engagement Controller', () => {
  let controller: EngagementController;
  const gameServiceStub = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngagementController],
      providers: [
        { provide: GameService, useValue: gameServiceStub }
      ]
    }).compile();

    controller = module.get<EngagementController>(EngagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
