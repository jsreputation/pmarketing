import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyService } from './loyalty.service';
import { HttpModule } from '@nestjs/common';

describe('LoyaltyService', () => {
  let service: LoyaltyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoyaltyService],
      imports: [
        HttpModule
      ]
    }).compile();

    service = module.get<LoyaltyService>(LoyaltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
