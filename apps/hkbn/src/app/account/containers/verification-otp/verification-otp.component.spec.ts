import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VerificationOtpComponent } from './verification-otp.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule, ProfileService, AuthenticationService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
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
    authService = TestBed.get(AuthenticationService);
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
    const nav = spyOn(router, 'navigate')
    spy.and.returnValue(throwError(null));
    const otp = '123456';
    component.validate(otp);
    expect(spy).toHaveBeenCalledWith(mockProfile.phone, otp);
    expect(nav).toHaveBeenCalled();
  }));

  it('expect resend sms', fakeAsync(() => {
    const spy = spyOn(authService, 'requestVerificationToken');
    spy.and.returnValue(throwError(null));
    component.resendSms();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
