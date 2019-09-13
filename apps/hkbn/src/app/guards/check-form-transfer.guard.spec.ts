import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { CheckFormTransferGuard } from './check-form-transfer.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountSummaryComponent } from '../account/components/account-summary/account-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DataTransferService } from '../services/data-transfer.service';

fdescribe('CheckFormTransferGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckFormTransferGuard,
        DataTransferService
      ],
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

  it('should check dataTransfer', inject([CheckFormTransferGuard, DataTransferService],
    fakeAsync((guard: CheckFormTransferGuard, dataTransfer: DataTransferService) => {
      dataTransfer.newxUpdateData({ phone: '888', otp: '999' });
      const result = guard.canActivate();
      tick();
      console.log(result, '7777')
      expect(result).toBeTruthy();
    })
  ));

  it('should navigate to account', inject([CheckFormTransferGuard, DataTransferService],
    fakeAsync((guard: CheckFormTransferGuard, dataTransfer: DataTransferService) => {
      dataTransfer.newxUpdateData(null);
      const result = guard.canActivate();
      
      tick();
      console.log(result,'439593797')
    })
  ));
});
