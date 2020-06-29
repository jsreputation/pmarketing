import { TestBed } from '@angular/core/testing';

import { V4TransactionsService } from './v4-transactions.service';
import { TransactionsService } from './transactions.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../config/config.service';

describe('V4TransactionsService', () => {

  const transactionServiceStub: Partial<TransactionsService> = {
    getTransactions: () => of()
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      { provide: TransactionsService, useValue: transactionServiceStub },
      { provide: ConfigService, useValue: configServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: V4TransactionsService = TestBed.get(V4TransactionsService);
    expect(service).toBeTruthy();
  });
});
