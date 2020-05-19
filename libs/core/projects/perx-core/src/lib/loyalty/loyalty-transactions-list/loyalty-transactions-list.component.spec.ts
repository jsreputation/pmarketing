import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list.component';
import { TransactionPipe } from './transaction.pipe';
import { DatePipe } from '@angular/common';

describe('LoyaltyTransactionsListComponent', () => {
  let component: LoyaltyTransactionsListComponent;
  let fixture: ComponentFixture<LoyaltyTransactionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyTransactionsListComponent, TransactionPipe ],
      providers: [
        DatePipe,
        TransactionPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
