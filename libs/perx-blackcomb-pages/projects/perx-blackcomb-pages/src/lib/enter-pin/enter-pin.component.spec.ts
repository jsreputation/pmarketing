import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPinComponent } from './enter-pin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UtilsModule, ProfileService, AuthenticationService, NotificationService } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';

const profileServiceStub = {
  whoAmI: () => of()
};

const authenticationServiceStub = {
  changePassword: () => of(),
  resendOTP: () => of()
};

const notificationServiceStub = {
  addSnack: () => {},
  addPopup: () => {}
};

describe('EnterPinComponent', () => {
  let component: EnterPinComponent;
  let fixture: ComponentFixture<EnterPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPinComponent ],
      imports: [
        UtilsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub},
        { provide: NotificationService, useValue: notificationServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call changePassword when pin entered', () => {
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
});
