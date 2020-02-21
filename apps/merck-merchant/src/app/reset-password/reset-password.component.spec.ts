import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetPasswordComponent } from './reset-password.component';
import {AuthenticationService, IMerchantAdminService, IProfile, NotificationService, ProfileService} from '@perx/core';
import {
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

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

  const merchantAdminServiceStub: Partial<IMerchantAdminService> = {
    resetPassword: () => of()
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
            getInterruptedUrl: () => ''
          }
        },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
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

  describe('onSubmit', () => {
    it('should call addSnack if password did NOT match', () => {
      component.resetPasswordForm.controls.password.setValue(1234);
      component.resetPasswordForm.controls.confirmPassword.setValue(123);
      const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
      (NotificationService as Type<NotificationService>);
      const notificationServiceSpy = spyOn(notificationService, 'addSnack');
      component.onSubmit();
      expect(notificationServiceSpy).toHaveBeenCalledWith('Passwords do not match.');
    });
  });

});
