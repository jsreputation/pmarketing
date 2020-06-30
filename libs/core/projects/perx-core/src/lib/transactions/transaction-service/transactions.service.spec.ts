import { TestBed } from '@angular/core/testing';

import { TransactionsService } from './transactions.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TransactionsService', () => {

  const transactionServiceStub: Partial<TransactionsService> = {
    getTransactions: () => of()
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      { provide: TransactionsService, useValue: transactionServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: TransactionsService = TestBed.get(TransactionsService);
    expect(service).toBeTruthy();
  });
});
