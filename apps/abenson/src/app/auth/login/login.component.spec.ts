import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService, NotificationService } from '@perx/core';
import { Type } from '@angular/core';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: AuthenticationService;
  let notificationService: NotificationService;
  const authenticationServiceStub = {
    login: () => of(null),
    getAppToken: () => of({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'home',
          component: LoginComponent
        }]),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    auth = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    notificationService = TestBed.get<NotificationService>(NotificationService as Type<NotificationService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login', fakeAsync(() => {
    (window as any).primaryIdentifier = null;
    component.loginForm.setValue({ mobileNumber: '12345', pinCode: '12345' });
    const spyAuth = spyOn(auth, 'login').and.returnValue(of(null));
    component.onSubmit();
    tick();
    expect(spyAuth).toHaveBeenCalled();
  }));

  it('should handle error', fakeAsync(() => {
    component.loginForm.setValue({ mobileNumber: '12345', pinCode: '12345' });
    const spyAuth = spyOn(auth, 'login');
    spyAuth.and.returnValue(throwError(new HttpErrorResponse({ status: 401 })));
    component.onSubmit();
    expect(component.errorMessage).toBe('Invalid credentials');
  }));

  it('expect ignore set primaryIdentifier', fakeAsync(() => {
    const primaryIdentifier = 'test';
    (window as any).primaryIdentifier = primaryIdentifier;
    component.loginForm.setValue({ mobileNumber: '12345', pinCode: '12345' });
    spyOn(auth, 'login').and.returnValue(of(null));
    component.onSubmit();
    tick();
    expect((window as any).primaryIdentifier).toBe(primaryIdentifier);
  }));

  it('should handle if error is not a HttpErrorResponse', fakeAsync(() => {
    component.loginForm.setValue({ mobileNumber: '12345', pinCode: '12345' });
    spyOn(auth, 'login').and.returnValue(throwError('error'));
    component.onSubmit();
    expect(component.errorMessage).toBe('error');
  }));

  it('should handle unknown status', fakeAsync(() => {
    component.errorMessage = undefined;
    spyOn(auth, 'login').and.returnValue(throwError(new HttpErrorResponse({ status: 403 })));
    component.onSubmit();
    expect(component.errorMessage).toBe(undefined);
  }));

  it('should handle error with status 0', fakeAsync(() => {
    spyOn(auth, 'login').and.returnValue(throwError(new HttpErrorResponse({ status: 0 })));
    const spy = spyOn(notificationService, 'addPopup');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  }));
});
