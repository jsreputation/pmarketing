import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VerificationOtpComponent } from './verification-otp.component';
import { UtilsModule, ProfileService, AuthenticationService } from '@perx/core';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IChangePhoneData } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';
import { Type } from '@angular/core';

const testphone = '18888888'

const profileServiceStub = {
  whoAmI: () => of({ phone: '12345' })
};

const authenticationServiceStub = {
  changePhone: () => of(),
  requestVerificationToken: () => of(),
  resendOTP: () => of()
};

describe('VerificationOtpComponent', () => {
  let component: VerificationOtpComponent;
  let fixture: ComponentFixture<VerificationOtpComponent>;
  let auth: AuthenticationService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationOtpComponent],
      imports: [
        UtilsModule
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ type: 'phone' }),
            queryParams: of({ phone: testphone })
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => { }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOtpComponent);
    auth = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display phone', () => {
    component.userPhone = testphone;
    expect(component.phoneDisplay).toBe('****8888')
  });

  it('shuld switch type', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect((component.data as IChangePhoneData).phone).toBe(testphone);
  }));

  it('should submit phone data', fakeAsync(() => {
    component.type = 'phone';
    component.data = { otp: '1111', phone: testphone };
    const authSpy = spyOn(auth, 'changePhone').and.returnValue(of(null));
    component.onSubmit();
    expect(authSpy).toHaveBeenCalled();
  }));

  it('should update ot', () => {
    const otp = '1111';
    component.update(otp);
    expect(component.data.otp).toBe(otp);
  });

  it('should resend otp', fakeAsync(() => {
    component.type = 'phone';
    component.userPhone = testphone;
    const authSpy = spyOn(auth, 'requestVerificationToken').and.returnValue(of(null));
    component.resendOtp();
    tick();
    expect(authSpy).toHaveBeenCalledWith(testphone);
  }));

  it('should resend otp for password flow', fakeAsync(()=>{
    component.type = 'password';
    const authSpy = spyOn(auth, 'resendOTP').and.returnValue(of(null));
    component.resendOtp();
    tick();
    expect(authSpy).toHaveBeenCalledWith(testphone);
  }));
});
