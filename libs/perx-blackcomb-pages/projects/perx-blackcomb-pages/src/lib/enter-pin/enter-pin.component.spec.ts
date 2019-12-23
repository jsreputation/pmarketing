import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPinComponent, PinMode } from './enter-pin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  UtilsModule,
  ProfileService,
  AuthenticationService,
  NotificationService,
  ThemesService,
  ITheme
} from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';

const mockTheme: ITheme = {
  name: 'theme',
  properties: {
    '--background': 'red',
    '--font_color': 'black'
  }
};

const profileServiceStub: Partial<ProfileService> = {
  whoAmI: () => of()
};

const authenticationServiceStub: Partial<AuthenticationService> = {
  changePassword: () => of(),
  resendOTP: () => of(),
  verifyOTP: () => of()
};

const notificationServiceStub: Partial<NotificationService> = {
  addSnack: () => {},
  addPopup: () => {}
};

const themeServiceStub: Partial<ThemesService> = {
  getThemeSetting: () => of(mockTheme)
};

describe('EnterPinComponent', () => {
  let component: EnterPinComponent;
  let fixture: ComponentFixture<EnterPinComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPinComponent ],
      imports: [
        UtilsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MatToolbarModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub},
        { provide: NotificationService, useValue: notificationServiceStub},
        { provide: ThemesService, useValue: themeServiceStub},
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ type: 'password' })) } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get<Router>(Router as Type<Router>);
    fixture = TestBed.createComponent(EnterPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call changePassword when pin entered in password mode', () => {
    component.changePasswordData = {
      newPassword: '',
      passwordConfirmation: '',
      oldPassword: '',
      otp: ''
    };
    const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const authenticationServiceSpy = spyOn(authenticationService, 'changePassword').and.returnValue(
      of({
        message: 'success'
      })
    );
    const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
    (NotificationService as Type<NotificationService>);
    const notificationServiceSpy = spyOn(notificationService, 'addPopup');
    component.onPinEntered('123456');
    expect(authenticationServiceSpy).toHaveBeenCalled();
    expect(notificationServiceSpy).toHaveBeenCalled();
  });

  it('should call verify Otp when pin entered in register mode', () => {
    component.pinMode = PinMode.register;
    component.userPhone = '123456';
    const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const authenticationServiceSpy = spyOn(authenticationService, 'verifyOTP').and.returnValue(
      of({
        message: 'success'
      })
    );
    const routerSpy = spyOn(router, 'navigate');

    component.onPinEntered('123456');
    expect(authenticationServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should call resendOTP when resendOTP clicked', () => {
    component.userPhone = '123456';
    const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const authenticationServiceSpy = spyOn(authenticationService, 'resendOTP').and.returnValue(
      of({
        message: 'success'
      })
    );
    const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
    (NotificationService as Type<NotificationService>);
    const notificationServiceSpy = spyOn(notificationService, 'addSnack');
    component.resendOtp();
    expect(authenticationServiceSpy).toHaveBeenCalled();
    expect(notificationServiceSpy).toHaveBeenCalled();
  });

  it('should navigate to home', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.dialogClosed();
    expect(routerSpy).toHaveBeenCalledWith('home');
  });
});
