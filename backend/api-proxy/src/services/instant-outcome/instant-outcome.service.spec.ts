import { Test, TestingModule } from '@nestjs/testing';
import { InstantOutcomeService } from './instant-outcome.service';

describe('InstantOutcomeService', () => {
  let service: InstantOutcomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstantOutcomeService],
    }).compile();

    service = module.get<InstantOutcomeService>(InstantOutcomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
