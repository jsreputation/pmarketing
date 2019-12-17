import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { AuthenticationService } from '@perx/core';

import { ForgotPinComponent } from './forgot-pin.component';

describe('ForgotPinComponent', () => {
  let component: ForgotPinComponent;
  let authenticationService: AuthenticationService;
  let fixture: ComponentFixture<ForgotPinComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  const authenticationServiceStub: Partial<AuthenticationService> = {
    forgotPassword: () => of(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForgotPinComponent ,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPinComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call forgotPassword after onSubmit', () => {
    const authenticationServiceSpy = spyOn(authenticationService, 'forgotPassword').and.callThrough();
    component.onSubmit();
    expect(authenticationServiceSpy).toHaveBeenCalled();
  });
});
