import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VerificationOtpComponent } from './verification-otp.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule, ProfileService, AuthenticationService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Type } from '@angular/core';
// import 'jasmine';
const mockProfile = {
  phone: '999'
};

const profileServiceStub = {
  whoAmI: () => of(mockProfile)
};

const authenticationServiceStub = {
  verifyOTP: () => of(null),
  requestVerificationToken: () => of(null)
};

describe('VerificationOtpComponent', () => {
  let component: VerificationOtpComponent;
  let fixture: ComponentFixture<VerificationOtpComponent>;
  let authService: AuthenticationService;
  let router: Router;
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
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOtpComponent);
    component = fixture.componentInstance;
    authService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to account/phone', fakeAsync(() => {
    const spy = spyOn(authService, 'verifyOTP');
    const nav = spyOn(router, 'navigate');
    spy.and.returnValue(of(null));
    const otp = '123456';
    component.validate(otp);
    expect(spy).toHaveBeenCalledWith(mockProfile.phone, otp);
    expect(nav).toHaveBeenCalled();
  }));

  it('expect resend sms', fakeAsync(() => {
    const spy = spyOn(authService, 'requestVerificationToken');
    spy.and.returnValue(of(null));
    component.resendSms();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
