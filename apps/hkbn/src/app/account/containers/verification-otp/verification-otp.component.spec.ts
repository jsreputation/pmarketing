import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VerificationOtpComponent } from './verification-otp.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule, ProfileService, AuthenticationService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { NotificationWrapperService } from 'src/app/services/notification-wrapper.service';
// import 'jasmine';
const mockProfile = {
  phone: '999'
};

const profileServiceStub = {
  whoAmI: () => of(mockProfile)
};

const notificationWrapperServiceStub = {
  addPopup: ()=>{},
  addSnack: ()=>{}
}

const authenticationServiceStub = {
  verifyOTP: () => of(null),
  requestVerificationToken: () => of(null),
  resendOTP: () => of(null)
};

describe('VerificationOtpComponent', () => {
  let component: VerificationOtpComponent;
  let fixture: ComponentFixture<VerificationOtpComponent>;
  let authService: AuthenticationService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationOtpComponent],
      imports: [
        TranslateModule.forRoot(),
        UtilsModule,
        RouterTestingModule.withRoutes([{
          path: 'account/phone',
          component: VerificationOtpComponent
        }])
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: NotificationWrapperService, useValue: notificationWrapperServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOtpComponent);
    component = fixture.componentInstance;
    authService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
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
    const spy = spyOn(authService, 'resendOTP');
    spy.and.returnValue(of(null));
    component.resendSms();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
