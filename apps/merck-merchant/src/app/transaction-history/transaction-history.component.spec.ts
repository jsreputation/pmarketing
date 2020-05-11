import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatToolbarModule, MatTabsModule } from '@angular/material';
import { LoyaltyModule } from '@perxtech/core';
import { Location } from '@angular/common';

import { TransactionHistoryComponent } from './transaction-history.component';
import { TransactionHistoryPipe } from './transaction-history.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { IMerchantAdminService } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  const locationStub: Partial<Location> = {
    back: () => { }
  };
  const merchantAdminServiceStub: Partial<IMerchantAdminService> = {
    getTransactionHistory: () => of(),
    getRewardTransactionHistory: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransactionHistoryComponent,
        TransactionHistoryPipe
      ],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        TranslateModule.forRoot(),
        MatToolbarModule,
        MatTabsModule,
        LoyaltyModule,
        LoyaltyModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: Location, useValue: locationStub },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub }
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
