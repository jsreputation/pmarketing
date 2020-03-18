import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordFormComponent } from '../../components/change-password-form/change-password-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, ProfileService } from '@perxtech/core';
import { of } from 'rxjs';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { TranslateModule } from '@ngx-translate/core';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { IChangePasswordData } from '@perxtech/core';

const password = 'password';

const passwordForm: IChangePasswordData = {
  otp: '8888',
  oldPassword: password,
  newPassword: password,
  passwordConfirmation: password
};

const accountStub = {
  phone: '777888999'
};

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let authService: AuthenticationService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{
          path: 'account/verify_token/password',
          component: ChangePasswordComponent
        }]),
        ErrorHandlerModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: AuthenticationService, useValue: {
            changePassword: () => of(null),
            requestVerificationToken: () => of(null)
          }
        }, {
          provide: ProfileService, useValue: {
            whoAmI: () => of(accountStub)
          }
        }
      ],
      declarations: [ChangePasswordComponent, ChangePasswordFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    authService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    router = TestBed.get<Router>(Router as Type<Router>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to account', fakeAsync(() => {
    spyOn(authService, 'changePassword').and.returnValue(of(null));
    const routerSpy = spyOn(router, 'navigate');
    component.changePassword(passwordForm);
    tick();
    expect(routerSpy).toHaveBeenCalledWith(['account', 'verify_token', 'password']);
  }));
});
