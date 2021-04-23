import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionHistoryComponent } from './transaction-history.component';
import { TransactionHistoryPipe } from './transaction-history.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Location } from '@angular/common';
import { LoyaltyModule, LoyaltyService } from '@perxtech/core';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockLoyalty, mockTransactions, mockTransactionsHistory } from './loyalty-mock';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  const locationStub: Partial<Location> = {
    back: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionHistoryComponent, TransactionHistoryPipe],
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatTabsModule,
        LoyaltyModule,
        BrowserAnimationsModule,
        InfiniteScrollModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: LoyaltyService,
          useValue: {
            getAllTransactions: () => of(mockTransactions),
            getLoyalty: () => of(mockLoyalty),
            getTransactionHistory: () => of(mockTransactionsHistory)
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
