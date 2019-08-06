import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list.component';

describe('TransactionsListComponent', () => {
  let component: LoyaltyTransactionsListComponent;
  let fixture: ComponentFixture<LoyaltyTransactionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyTransactionsListComponent ]
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
