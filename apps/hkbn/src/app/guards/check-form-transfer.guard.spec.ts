import { TestBed, inject } from '@angular/core/testing';

import { CheckFormTransferGuard } from './check-form-transfer.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountSummaryComponent } from '../account/components/account-summary/account-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

describe('CheckFormTransferGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckFormTransferGuard],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'account',
          component: AccountSummaryComponent
        }]),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        TranslateModule,
        MatIconModule,
        MatSlideToggleModule
      ],
      declarations: [AccountSummaryComponent]
    });
  });

  it('should ...', inject([CheckFormTransferGuard], (guard: CheckFormTransferGuard) => {
    expect(guard).toBeTruthy();
  }));
});
