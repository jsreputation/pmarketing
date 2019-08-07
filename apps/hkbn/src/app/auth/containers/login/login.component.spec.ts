import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '@perx/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ErrorHandlerModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {v4GameOauth: () => Promise.resolve(true)}
        }
      ],
      declarations: [LoginComponent, LoginFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to forgot password, when call forgotPassword method', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.forgotPassword();
    expect(navigateSpy).toHaveBeenCalledWith(['/forgot-password'], {queryParams: {identifier: ''}});
  });
});
