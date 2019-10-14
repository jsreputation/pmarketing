import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from '@perx/core';
import { Type } from '@angular/core';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: AuthenticationService;
  const authenticationServiceStub = {
    login: () => of(null)
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login', fakeAsync(() => {
    component.loginForm.setValue({ mobileNumber: '12345', pinCode: '12345' });
    const spyAuth = spyOn(auth, 'login').and.returnValue(of(null));
    component.onSubmit();
    tick();
    expect(spyAuth).toHaveBeenCalled();
  }));

  it('should handle error', fakeAsync(() => {
    component.loginForm.setValue({ mobileNumber: '12345', pinCode: '12345' });
    const spyAuth = spyOn(auth, 'login');
    spyAuth.and.returnValue(throwError(new HttpErrorResponse({status: 401})));
    component.onSubmit();
    expect(component.errorMessage).toBe('Invalid credentials');
  }));
});
