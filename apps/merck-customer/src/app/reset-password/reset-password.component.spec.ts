import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { AuthenticationService, IProfile, NotificationService, ProfileService } from '@perx/core';
import {
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let router: Router;

  const mockProfile: IProfile = {
    id: 1,
    state: 'active',
    firstName: '',
    lastName: '',
    phone: '6512345678',
  };

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of(mockProfile)
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            login: () => {
            },
            resetPassword: () => of(),
            getUserAccessToken: () => '',
            getAppAccessToken: () => '',
            getInterruptedUrl: () => ''
          }
        },
        { provide: ProfileService, useValue: profileServiceStub },
        {
          provide: NotificationService,
          useValue: {
            addSnack: () => {
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onUpdatePassword', () => {
    it('should call addSnack if password did NOT match', () => {
      component.resetPasswordForm.controls.password.setValue(1234);
      component.resetPasswordForm.controls.confirmPassword.setValue(123);
      const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
      (NotificationService as Type<NotificationService>);
      const notificationServiceSpy = spyOn(notificationService, 'addSnack');
      component.onUpdatePassword();
      expect(notificationServiceSpy).toHaveBeenCalledWith('Passwords do not match.');
    });

    it('should reset password and call login', (done: jest.DoneCallback) => {
      const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>
      (AuthenticationService as Type<AuthenticationService>);
      const authenticationServiceSpy = spyOn(authenticationService, 'resetPassword').and.returnValue(
        of({
          message: 'test',
          code: 1234,
        })
      );
      const authenticationUserTokenSpy = spyOn(authenticationService, 'getUserAccessToken').and.returnValue('mock User Token');

      const profileService: ProfileService = fixture.debugElement.injector.get<ProfileService>(ProfileService as Type<ProfileService>);
      const profileServiceSpy = spyOn(profileService, 'whoAmI').and.returnValue(
        of(mockProfile)
      );
      const loginSpy = spyOn(authenticationService, 'login').and.returnValue(of(void 0));
      spyOn(router, 'navigateByUrl').and.stub();
      component.onUpdatePassword();
      expect(authenticationUserTokenSpy).toHaveBeenCalled();
      expect(profileServiceSpy).toHaveBeenCalled();

      profileService.whoAmI().subscribe(() => {
        expect(authenticationServiceSpy).toHaveBeenCalled();
        expect(loginSpy).toHaveBeenCalled();
        expect(router.navigateByUrl).toHaveBeenCalledWith('account');
        done();
      });

    });
  });

});
