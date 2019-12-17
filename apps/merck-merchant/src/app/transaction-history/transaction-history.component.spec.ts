import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatToolbarModule, MatTabsModule } from '@angular/material';
import { LoyaltyModule } from '@perx/core';
import { Location } from '@angular/common';

import { TransactionHistoryComponent } from './transaction-history.component';
import { TransactionHistoryPipe } from './transaction-history.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { IMerchantAdminService } from '@perx/core';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  const locationStub = {
    goBack: () => {}
  };
  const merchantAdminServiceStub = {
    getTransactionHistory: () => of()
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
        LoyaltyModule
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