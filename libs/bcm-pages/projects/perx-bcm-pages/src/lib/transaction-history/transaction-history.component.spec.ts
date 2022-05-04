import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfigService, LoyaltyModule } from '@perxtech/core';
import { Location } from '@angular/common';

import { TransactionHistoryComponent } from './transaction-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { IMerchantAdminService } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterTestingModule } from '@angular/router/testing';

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

  const configServiceStub: Partial<ConfigService> = { readAppConfig: () => of() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransactionHistoryComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        TranslateModule.forRoot(),
        MatToolbarModule,
        MatTabsModule,
        LoyaltyModule,
        LoyaltyModule,
        InfiniteScrollModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Location, useValue: locationStub },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
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
