import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { HttpModule } from '@nestjs/common';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
      imports: [
        HttpModule
      ]
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
