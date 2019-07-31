import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService, UtilsModule } from '@perx/core';
import { of } from 'rxjs';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ErrorHandlerModule,
        UtilsModule,
        NoopAnimationsModule
      ],
      declarations: [ForgotPasswordComponent],
      providers: [
        {
          provide: AuthenticationService, useValue: {
            forgotPassword: () => of(true),
            resendOTP: () => of(true),
            verifyOTP: () => of (true),
            changePassword: () => of(true)
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
