import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { AuthenticationService, NotificationService } from '@perxtech/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

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
      component.initTranslate();
      component.onUpdatePassword();
      expect(notificationServiceSpy).toHaveBeenCalledWith('RESET_PW_PAGE.PASSWORD_NOT_MATCH');
    });

    // it('should reset password and call login', (done: jest.DoneCallback) => {
    //   const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>
    //   (AuthenticationService as Type<AuthenticationService>);
    //   const authenticationServiceSpy = spyOn(authenticationService, 'resetPassword').and.returnValue(
    //     of({
    //       message: 'test',
    //       code: 1234,
    //     })
    //   );
    //   const authenticationUserTokenSpy = spyOn(authenticationService, 'getUserAccessToken').and.returnValue('mock User Token');

    //   const profileService: ProfileService = fixture.debugElement.injector.get<ProfileService>(ProfileService as Type<ProfileService>);
    //   const profileServiceSpy = spyOn(profileService, 'whoAmI').and.returnValue(
    //     of(mockProfile)
    //   );
    //   const loginSpy = spyOn(authenticationService, 'login').and.returnValue(of(void 0));
    //   spyOn(router, 'navigateByUrl').and.stub();
    //   component.onUpdatePassword();
    //   expect(authenticationUserTokenSpy).toHaveBeenCalled();
    //   expect(profileServiceSpy).toHaveBeenCalled();

    //   profileService.whoAmI().subscribe(() => {
    //     expect(authenticationServiceSpy).toHaveBeenCalled();
    //     expect(loginSpy).toHaveBeenCalled();
    //     expect(router.navigateByUrl).toHaveBeenCalledWith('account');
    //     done();
    //   });

    // });
  });

});
