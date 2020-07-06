import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {AuthenticationService, ProfileService} from '@perxtech/core';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  const authenticationServiceStub: Partial<AuthenticationService> = {
    requestVerificationToken: () => of(),
    login: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        MatInputModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ProfileService, useValue: { whoAmI: () => of(true) }},
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail password matching', () => {
    component.changePasswordForm.controls.newPassword.setValue(1234);
    component.changePasswordForm.controls.confirmPassword.setValue(123);
    const spy = spyOn(authenticationServiceStub, 'requestVerificationToken');
    component.onSubmit();
    expect(component.changePasswordForm.valid).toBe(false);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call login when password old is correct and password matches', fakeAsync(() => {
    component.changePasswordForm.controls.oldPassword.setValue(1234);
    component.changePasswordForm.controls.newPassword.setValue(123);
    component.changePasswordForm.controls.confirmPassword.setValue(123);
    const router: Router = TestBed.get<Router>(Router as Type<Router>);
    const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const authenticationServiceSpy = spyOn(authenticationService, 'login').and.returnValue({
      pipe: () => of(router.navigateByUrl('/otp/password')
      )
    });
    spyOn(router, 'navigateByUrl').and.stub();
    component.onSubmit();
    tick();
    expect(authenticationServiceSpy).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalled();
  }));
});
