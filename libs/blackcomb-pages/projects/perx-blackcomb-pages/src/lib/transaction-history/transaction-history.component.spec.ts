import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { TransactionHistoryComponent } from './transaction-history.component';
import {
  LoyaltyModule,
  LoyaltyService,
  SettingsService
} from '@perxtech/core';
import { of } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoyaltyModule,
        InfiniteScrollModule,
        TranslateModule.forRoot()
      ],
      declarations: [TransactionHistoryComponent],
      providers: [
        {
          provide: LoyaltyService,
          useValue: {
            getAllTransactions: () => of(),
            getTransactionHistory: () => of()
          }
        },
        { provide: SettingsService, useValue: settingsServiceStub }
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
