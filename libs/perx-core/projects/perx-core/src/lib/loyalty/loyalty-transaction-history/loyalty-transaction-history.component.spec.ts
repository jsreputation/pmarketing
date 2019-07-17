import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyTransactionHistoryComponent } from './loyalty-transaction-history.component';

describe('LoyaltyTransactionHistoryComponent', () => {
  let component: LoyaltyTransactionHistoryComponent;
  let fixture: ComponentFixture<LoyaltyTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
