import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VerificationOtpComponent } from './verification-otp.component';
import { UtilsModule, ProfileService, AuthenticationService, IProfile, NotificationService, IChangePhoneData } from '@perxtech/core';
import { of, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedDataService } from '../../../services/shared-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { IWMessageResponse } from '@perxtech/whistler';
import { MatDialogModule } from '@angular/material/dialog';

describe('VerificationOtpComponent', () => {
  const testphone: string = '18888888';
  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of({ phone: '12345' })
  };
  const authenticationServiceStub: Partial<AuthenticationService> = {
    changePhone: () => of(),
    requestVerificationToken: () => of(),
    resendOTP: () => of(),
    changePassword: () => of()
  };
  let component: VerificationOtpComponent;
  let fixture: ComponentFixture<VerificationOtpComponent>;
  let auth: AuthenticationService;
  const params = new BehaviorSubject({ type: 'phone' });
  let profileService: ProfileService;
  let router: Router;
  const notificationServiceStub: Partial<NotificationService> = {
    $popup: of(),
    addPopup: () => { }
  };

  const activatedRouteStub: Partial<ActivatedRoute> = {
    params,
    queryParams: of({ phone: testphone })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationOtpComponent],
      imports: [
        UtilsModule,
        NoopAnimationsModule,
        MatDialogModule,
        RouterTestingModule.withRoutes([{
          path: 'account',
          component: VerificationOtpComponent
        }])
      ],
      providers: [
        SharedDataService,
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: { navigate: () => { } } },
        { provide: NotificationService, useValue: notificationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOtpComponent);
    auth = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    profileService = TestBed.get<ProfileService>(ProfileService as Type<ProfileService>);
    router = TestBed.get<Router>(Router as Type<Router>);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('phone flow', () => {
    beforeEach(() => {
      params.next({ type: 'phone' });
    });
    it('should display phone', () => {
      component.userPhone = testphone;
      expect(component.phoneDisplay).toBe('****8888');
    });

    it('shuld switch type', fakeAsync(() => {
      component.ngOnInit();
      tick();
      expect((component.data as IChangePhoneData).phone).toBe(testphone);
    }));

    it('should submit phone data', fakeAsync(() => {
      component.type = 'phone';
      component.data = { otp: '1111', phone: testphone };
      const authSpy = spyOn(auth, 'changePhone').and.callThrough();
      component.onSubmit();
      tick();
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
      const authSpy = spyOn(auth, 'requestVerificationToken').and.callThrough();
      component.resendOtp();
      tick();
      expect(authSpy).toHaveBeenCalledWith(testphone);
    }));

    it('should resend otp for password flow', fakeAsync(() => {
      component.type = 'password';
      const authSpy = spyOn(auth, 'resendOTP').and.callThrough();
      component.resendOtp();
      tick();
      expect(authSpy).toHaveBeenCalledWith(testphone);
    }));
  });
  describe('password flow', () => {

    beforeEach(() => {
      params.next({ type: 'password' });
    });

    it('should handle passowrd flow', fakeAsync(() => {
      const spy = spyOn(profileService, 'whoAmI').and.returnValue(of({ phone: '18888' } as IProfile));
      component.ngOnInit();
      tick();
      expect(spy).toHaveBeenCalled();
    }));

    it('should handle password submit', fakeAsync(() => {
      component.type = 'password';
      spyOn(auth, 'changePassword').and.returnValue(of({} as IWMessageResponse));
      const spyRouter = spyOn(router, 'navigate');
      component.onSubmit();
      tick();
      fixture.detectChanges();
      expect(spyRouter).toHaveBeenCalled();
    }));
  });
  describe('not correct type', () => {
    beforeEach(() => {
      params.next({ type: 'unknown' });
    });

    it('should not have call profile service', fakeAsync(() => {
      const spy = spyOn(profileService, 'whoAmI');
      component.ngOnInit();
      tick();
      expect(spy).not.toHaveBeenCalled();
    }));
  });
});
