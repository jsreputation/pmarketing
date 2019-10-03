import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryComponent } from './transaction-history.component';
import { TransactionPipe } from './transaction.pipe';
import { MatIconModule, MatToolbarModule, MatTabsModule } from '@angular/material';
import { Location } from '@angular/common';
import { LoyaltyModule, LoyaltyService } from '@perx/core';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockTransactions } from './loyalty-mock';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  const locationStub = {
    goBack: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionHistoryComponent, TransactionPipe ],
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatTabsModule,
        LoyaltyModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: LoyaltyService,
          useValue: {
            getAllTransactions: () => of(mockTransactions)
          }
        },
        {
          provide: Location,
          useValue: locationStub
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
