import { TestBed, inject } from '@angular/core/testing';

import { GameOutcomeService } from './game-outcome.service';
import { vouchers } from 'src/app/vouchers.mock';

describe('GameOutcomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameOutcomeService = TestBed.get(GameOutcomeService);
    expect(service).toBeTruthy();
  });

  it('should return voucher', inject([GameOutcomeService], (gameOutcome: GameOutcomeService) => {
    gameOutcome.setVouchersList(vouchers);
    const result = gameOutcome.getVouchersRewarded();
    expect(result).toEqual(vouchers);
    gameOutcome.clearVoucherList();
    const cleanResult = gameOutcome.getVouchersRewarded();
    expect(cleanResult).toEqual([]);
  }));
});
