import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryComponent } from './transaction-history.component';
import { LoyaltyModule, LoyaltyService } from '@perxtech/core';
import { of } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoyaltyModule,
        InfiniteScrollModule
      ],
      declarations: [TransactionHistoryComponent],
      providers: [
        {
          provide: LoyaltyService,
          useValue: {
            getAllTransactions: () => of(),
            getTransactionHistory: () => of()
          }
        }
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
