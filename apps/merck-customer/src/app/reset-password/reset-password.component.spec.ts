import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { AuthenticationService, NotificationService } from '@perx/core';
import {
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Type } from '@angular/core';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
       providers: [
        {
          provide: AuthenticationService,
          useValue: {
            v4GameOauth: () => {},
            resetPassword: () => of()
          }
        },
        {
          provide: NotificationService,
          useValue: {
            addSnack: () => {}
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
    it ('should call addSnack if password did NOT match', () => {
      component.resetPasswordForm.controls.password.setValue(1234);
      component.resetPasswordForm.controls.confirmPassword.setValue(123);
      const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
        (NotificationService as Type<NotificationService>);
      const notificationServiceSpy = spyOn(notificationService, 'addSnack');
      component.onUpdatePassword();
      expect(notificationServiceSpy).toHaveBeenCalledWith('Passwords do not match.');
    });

    it('should reset password and call v4GameOauth', fakeAsync(() => {
      const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>
        (AuthenticationService as Type<AuthenticationService>);
      const authenticationServiceSpy = spyOn(authenticationService, 'resetPassword').and.returnValue(
        of({
          message: 'test',
          code: 1234,
        })
      );
      const v4GameOauthSpy = spyOn(authenticationService, 'v4GameOauth').and.returnValue(Promise.resolve(true));
      component.onUpdatePassword();
      tick();
      expect(authenticationServiceSpy).toHaveBeenCalled();
      expect(v4GameOauthSpy).toHaveBeenCalled();
    }));
  });

});
