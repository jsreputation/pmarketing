import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list.component';
import { LoyaltyModule as PerxLoyaltyModule, LoyaltyService } from '@perxtech/core';
import { of } from 'rxjs';

describe('TransactionsListComponent', () => {
  let component: LoyaltyTransactionsListComponent;
  let fixture: ComponentFixture<LoyaltyTransactionsListComponent>;
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getAllTransactions: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoyaltyTransactionsListComponent],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatTabsModule,
        PerxLoyaltyModule
      ],
      providers: [
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
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
