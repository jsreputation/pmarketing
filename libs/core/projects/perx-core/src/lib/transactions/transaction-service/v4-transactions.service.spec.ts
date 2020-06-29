import { TestBed } from '@angular/core/testing';

import { V4TransactionsService } from './v4-transactions.service';

describe('V4TransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: V4TransactionsService = TestBed.get(V4TransactionsService);
    expect(service).toBeTruthy();
  });
});
