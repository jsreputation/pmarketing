import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from '@perxtech/core';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  const authenticationServiceStub: Partial<AuthenticationService> = {
    requestVerificationToken: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatInputModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
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

  it('should call requestVerificationToken when password matches', fakeAsync(() => {
    component.changePasswordForm.controls.oldPassword.setValue(1234);
    component.changePasswordForm.controls.newPassword.setValue(123);
    component.changePasswordForm.controls.confirmPassword.setValue(123);
    const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const authenticationServiceSpy = spyOn(authenticationService, 'requestVerificationToken').and.returnValue(
      of({
        message: 'success'
      })
    );

    const router: Router = TestBed.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.onSubmit();
    tick();
    expect(authenticationServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  }));
});
