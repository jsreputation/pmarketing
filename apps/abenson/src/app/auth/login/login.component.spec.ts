import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {AuthenticationService, ConfigService, NotificationService} from '@perx/core';
import { Type } from '@angular/core';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CardComponentMock } from '../../card/containers/card/card.component.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: AuthenticationService;
  const notificationServiceStub: Partial<NotificationService> = {
    addPopup: () => void 0
  };
  const authenticationServiceStub: Partial<AuthenticationService> = {
    login: () => of(void 0),
    getAppAccessToken: () => 'token',
    getAppToken: () => of({
      access_token: 'string',
      token_type: 'string',
      expires_in: 666,
      created_at: 666})
  };
  const configServiceStub: ConfigService = { readAppConfig: () => of() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'home',
          component: LoginComponent
        },
        {
          path: 'card',
          component: CardComponentMock
        }]),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    auth = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login', fakeAsync(() => {
    (window as any).primaryIdentifier = null;
    component.loginForm.setValue({ mobileNumber: '12345', pinCode: '12345' });
    const spyAuth = spyOn(auth, 'login').and.returnValue(of(void 0));
    component.onSubmit();
    tick();
    expect(spyAuth).toHaveBeenCalled();
  }));

  it('should handle error', fakeAsync(() => {
    component.loginForm.setValue({ mobileNumber: '12345', pinCode: '12345' });
    const spyAuth = spyOn(auth, 'login');
    spyAuth.and.returnValue(throwError(new HttpErrorResponse({ status: 401 })));
    component.onSubmit();
    tick();
    expect(component.errorMessage).toBe('Invalid credentials');
  }));

  it('expect ignore set primaryIdentifier', fakeAsync(() => {
    const primaryIdentifier = 'test';
    (window as any).primaryIdentifier = primaryIdentifier;
    component.loginForm.setValue({ mobileNumber: '12345', pinCode: '12345' });
    spyOn(auth, 'login').and.returnValue(of(void 0));
    component.onSubmit();
    tick();
    expect((window as any).primaryIdentifier).toBe(primaryIdentifier);
  }));

  it('should handle if error is not a HttpErrorResponse', fakeAsync(() => {
    component.loginForm.setValue({ mobileNumber: '12345', pinCode: '12345' });
    spyOn(auth, 'login').and.returnValue(throwError('error'));
    component.onSubmit();
    tick();
    expect(component.errorMessage).toBe('error');
  }));

  it('should handle unknown status', fakeAsync(() => {
    component.errorMessage = undefined;
    spyOn(auth, 'login').and.returnValue(throwError(new HttpErrorResponse({ status: 403 })));
    component.onSubmit();
    tick();
    expect(component.errorMessage).toBe(undefined);
  }));

  it('should handle error with status 0', fakeAsync(() => {
    spyOn(auth, 'login').and.returnValue(throwError(new HttpErrorResponse({ status: 0 })));
    const notificationSvc = TestBed.get(NotificationService);
    const spy = spyOn(notificationSvc, 'addPopup');
    component.onSubmit();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
