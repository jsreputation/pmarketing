import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionPipe } from './transaction.pipe';

describe('LoyaltyTransactionsListComponent', () => {
  let component: LoyaltyTransactionsListComponent;
  let fixture: ComponentFixture<LoyaltyTransactionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyTransactionsListComponent, TransactionPipe ],
      imports: [
        HttpClientTestingModule
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
