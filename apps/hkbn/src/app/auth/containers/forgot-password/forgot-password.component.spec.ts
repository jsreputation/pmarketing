import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService, UtilsModule } from '@perx/core';
import { Observable, of } from 'rxjs';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Type } from '@angular/core';

class ActivatedRouteMock {
  public get queryParams(): Observable<any> {
    return of(true);
  }
}

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ErrorHandlerModule,
        UtilsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ForgotPasswordComponent],
      providers: [
        {
          provide: ActivatedRoute, useClass: ActivatedRouteMock,
        },
        {
          provide: AuthenticationService, useValue: {
            forgotPassword: () => of(true),
            resendOTP: () => of(true),
            verifyOTP: () => of(true),
            changePassword: () => of(true),
            resetPassword: () => of(true),
            login: () => of(true)
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should init identifier from queryParams, if it exist', () => {
    const activatedRoute = TestBed.get(ActivatedRoute);
    jest.spyOn(activatedRoute, 'queryParams', 'get').mockReturnValue(of({ identifier: '63987654' }));
    fixture.detectChanges();
    expect(component.phoneStepForm.value).toEqual({ phone: '63987654' });
  });

  it('phoneHandler should move to step 2', () => {
    fixture.detectChanges();
    component.phoneStepForm.setValue({ phone: '63987654' });
    component.phoneHandler();
    fixture.detectChanges();
    expect(component.currentStep).toEqual(2);
  });

  it('should do nothing if phoneStepForm is invalid', () => {
    fixture.detectChanges();
    component.phoneHandler();
    expect(component.currentStep).toEqual(1);
  });

  it('pinHandle should move to step 3', () => {
    fixture.detectChanges();
    component.handlePin('334245');
    expect(component.currentStep).toEqual(3);
  });

  it('should call resendOTP of authenticationService when call resend method', () => {
    fixture.detectChanges();
    const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const resendOTPSpy = spyOn(authenticationService, 'resendOTP').and.callThrough();
    component.resend();
    expect(resendOTPSpy).toHaveBeenCalled();
  });

  it('should do nothing if password form invalid', () => {
    fixture.detectChanges();
    const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const resetPasswordSpy = spyOn(authenticationService, 'resetPassword').and.returnValue(of({ message: 'password reset' }));
    component.changePassword();
    expect(resetPasswordSpy.calls.count()).toBe(0);
  });

  it('should reset user password, when call changePassword method and data is valid', () => {
    fixture.detectChanges();
    const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const resetPasswordSpy = spyOn(authenticationService, 'resetPassword').and.returnValue(of({ message: 'password reset' }));
    const loginSpy = spyOn(authenticationService, 'login').and.returnValue(of({ bearer_token: 'SWWERW' }));

    component.phoneStepForm.setValue({ phone: '63987654' });
    component.phoneHandler();
    fixture.detectChanges();

    component.handlePin('334245');

    component.newPasswordForm.setValue({ newPassword: 'qwerty123', passwordConfirmation: 'qwerty123' });
    component.changePassword();
    expect(resetPasswordSpy).toHaveBeenCalledWith(
      { phone: '63987654', otp: '334245', newPassword: 'qwerty123', passwordConfirmation: 'qwerty123' }
    );

    expect(loginSpy).toHaveBeenCalledWith('63987654', 'qwerty123');
  });
});
