import { Test, TestingModule } from '@nestjs/testing';
import { InstantOutcomeService } from './instant-outcome.service';
import { HttpModule } from '@nestjs/common';

describe('InstantOutcomeService', () => {
  let service: InstantOutcomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstantOutcomeService],
      imports: [
        HttpModule
      ]
    }).compile();

    service = module.get<InstantOutcomeService>(InstantOutcomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
