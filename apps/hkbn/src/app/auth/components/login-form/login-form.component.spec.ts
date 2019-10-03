import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ErrorHandlerModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [LoginFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit event when form invalid', () => {
    const loginSubmitSpy = spyOn(component.loginSubmit, 'emit');
    component.submit();
    expect(loginSubmitSpy.calls.count()).toBe(0);
  });

  it('should emit event when form valid', () => {
    spyOn(component.loginSubmit, 'emit');
    component.loginForm.setValue({user: 'John', pass: 'qwerty123', stayLoggedIn: true});
    fixture.detectChanges();
    component.submit();
    expect(component.loginSubmit.emit).toHaveBeenCalled();
  });

  it('should emit event when clicking on forgot password', () => {
    spyOn(component.forgotPassword, 'emit');
    component.forgot();
    expect(component.forgotPassword.emit).toHaveBeenCalled();
  });
});
