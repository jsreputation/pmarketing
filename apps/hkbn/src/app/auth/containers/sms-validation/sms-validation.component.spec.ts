import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsValidationComponent } from './sms-validation.component';
import { AuthenticationService, UtilsModule } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('SmsValidationComponent', () => {
  let component: SmsValidationComponent;
  let fixture: ComponentFixture<SmsValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UtilsModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [SmsValidationComponent],
      providers: [
        {
          provide: AuthenticationService, useValue: {
            verifyOTP: () => of(true),
            v4GameOauth: () => Promise.resolve(true),
            resendOTP: () => of(true)
          }
        },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ identifier: '639876543210' })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validate method', () => {
    let authenticationService;
    let verifyOTPSpy;
    let router;
    let navigateSpy;

    beforeEach(() => {
      authenticationService = TestBed.get(AuthenticationService);
      verifyOTPSpy = spyOn(authenticationService, 'verifyOTP').and.returnValue(of(true));
      router = TestBed.get(Router);
      navigateSpy = spyOn(router, 'navigate');
    });

    it('should validate otp, authorize and redirect to root page', () => {
      component.validate('888888');
      expect(verifyOTPSpy).toHaveBeenCalledWith('639876543210', '888888');
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });

    it('should validate otp, but not authorized', () => {
      spyOn(authenticationService, 'v4GameOauth').and.returnValue(false);
      component.validate('888888');
      expect(verifyOTPSpy).toHaveBeenCalledWith('639876543210', '888888');
      expect(navigateSpy.calls.count()).toBe(0);
    });
  });

  it('should make request for send otp, when call resendSms method', () => {
    const authenticationService = TestBed.get(AuthenticationService);
    const resendSpy = spyOn(authenticationService, 'resendOTP').and.returnValue(of(null));
    component.resendSms();
    expect(resendSpy).toHaveBeenCalledWith('639876543210');
  });
});
