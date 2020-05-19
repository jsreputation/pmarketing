import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VerificationOtpComponent } from './verification-otp.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UtilsModule, ProfileService, AuthenticationService } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { NotificationWrapperService } from '../../../services/notification-wrapper.service';
const mockProfile = {
  phone: '999'
};

const profileServiceStub: Partial<ProfileService> = {
  whoAmI: () => of(mockProfile)
};

const notificationWrapperServiceStub: Partial<NotificationWrapperService> = {
  addPopup: () => { },
  addSnack: () => { }
};

const authenticationServiceStub: Partial<AuthenticationService> = {
  verifyOTP: () => of(null),
  requestVerificationToken: () => of(null),
  resendOTP: () => of(null),
  changePassword: () => of(null),
  changePhone: () => of(null)
};

describe('VerificationOtpComponent', () => {
  let component: VerificationOtpComponent;
  let fixture: ComponentFixture<VerificationOtpComponent>;
  let authService: AuthenticationService;
  let translateService: TranslateService;
  let notificationService: NotificationWrapperService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationOtpComponent],
      imports: [
        TranslateModule.forRoot(),
        UtilsModule,
        RouterTestingModule.withRoutes([{
          path: 'account/phone',
          component: VerificationOtpComponent
        }, {
          path: 'account',
          component: VerificationOtpComponent
        }])
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: NotificationWrapperService, useValue: notificationWrapperServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOtpComponent);
    component = fixture.componentInstance;
    authService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    translateService = TestBed.get<TranslateService>(TranslateService as Type<TranslateService>);
    notificationService = TestBed.get<NotificationWrapperService>(NotificationWrapperService as Type<NotificationWrapperService>);
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
    component.type = 'password';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect resend sms', fakeAsync(() => {
    const spy = spyOn(authService, 'requestVerificationToken');
    spy.and.returnValue(of(null));
    component.resendSms();
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call switchMethod', fakeAsync(() => {
    const otp = '111222';
    spyOn(authService, 'changePassword').and.returnValue(of(null));
    const translateSpy = spyOn(translateService, 'get');
    component.update(otp);
    tick();
    expect(translateSpy).toHaveBeenCalledWith('OTP_PAGE.PASSWORD_SUCCESS_UPDATE');
  }));

  it('should do all workflow with mobile', fakeAsync(() => {
    const otp = '111222';
    const msg = 'phone';
    component.type = 'phone';
    fixture.detectChanges();
    spyOn(authService, 'changePhone').and.returnValue(of(null));
    spyOn(translateService, 'get').and.returnValue(of(msg));
    const spy = spyOn(notificationService, 'addSnack');
    component.update(otp);
    tick();
    expect(spy).toHaveBeenCalledWith(msg);
  }));
});
