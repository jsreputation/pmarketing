import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { CheckFormTransferGuard } from './check-form-transfer.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountSummaryComponent } from '../account/components/account-summary/account-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DataTransferService } from '../services/data-transfer.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
const fakeRoute: ActivatedRouteSnapshot = {
  params: { id: 'phone' },
  url: null,
  queryParams: null,
  fragment: null,
  data: null,
  outlet: null,
  component: null,
  root: null,
  routeConfig: null,
  parent: null,
  firstChild: null,
  children: null,
  pathFromRoot: null,
  paramMap: null,
  queryParamMap: null
};

const password = '888';

describe('CheckFormTransferGuard', () => {
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

  it('should leave route, what is not password', inject([CheckFormTransferGuard],
    (guard: CheckFormTransferGuard) => {
      const result = guard.canActivate(fakeRoute);
      expect(result).toBeTruthy();
    })
  );

  it('should check dataTransfer', inject([CheckFormTransferGuard, DataTransferService],
    fakeAsync((guard: CheckFormTransferGuard, dataTransfer: DataTransferService) => {
      fakeRoute.params.id = 'password';
      dataTransfer.newxUpdateData({ passwordConfirmation: password, otp: '999', newPassword: password, oldPassword: password });
      const result = (guard.canActivate(fakeRoute) as Observable<boolean>).toPromise();
      tick();
      expect(result).toBeTruthy();
    })
  ));
});
