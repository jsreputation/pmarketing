import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {
  LoyaltyModule,
  LoyaltyService,
} from '@perx/core';

import { HistoryComponent } from './history.component';

import { transactions } from '../mock/transaction.mock';
import { loyalties } from '../mock/loyalty.mock';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  const loyaltyServiceStub = {
    getTransactions: () => of(transactions),
    getLoyalties: () => of(loyalties),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [
        LoyaltyModule,
        MatTabsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        InfiniteScrollModule,
      ],
      providers: [
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
