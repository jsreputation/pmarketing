import { TestBed } from '@angular/core/testing';

import { GameOutcomeService } from './game-outcome.service';

describe('GameOutcomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameOutcomeService = TestBed.get(GameOutcomeService);
    expect(service).toBeTruthy();
  });
});
