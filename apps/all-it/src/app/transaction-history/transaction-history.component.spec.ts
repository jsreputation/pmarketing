import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { TransactionHistoryComponent } from './transaction-history.component';
import {
  LoyaltyModule,
  LoyaltyService,
  TransactionsService
} from '@perxtech/core';
import { of } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;

  const transactionServiceStub: Partial<TransactionsService> = {
    getTransactions: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoyaltyModule,
        InfiniteScrollModule
      ],
      declarations: [ TransactionHistoryComponent ],
      providers: [
        {
          provide: LoyaltyService,
          useValue: {
            getLoyalties: () => of(),
            getAllTransactions: () => of(),
            getTransactionHistory: () => of()
          }
        },
        { provide: TransactionsService, useValue: transactionServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
