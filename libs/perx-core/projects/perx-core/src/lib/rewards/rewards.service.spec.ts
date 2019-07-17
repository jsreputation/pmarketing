import { TestBed } from '@angular/core/testing';

import { RewardsService } from './rewards.service';
import { Type } from '@angular/core';

describe('RewardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    // https://github.com/angular/angular/issues/29905 abstract classes need to be typecasted
    const service: RewardsService = TestBed.get(RewardsService as Type<RewardsService>);
    expect(service).toBeTruthy();
  });
});
