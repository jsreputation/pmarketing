import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenticationModule, CognitoModule, OauthModule } from '@perx/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '@perx/core/dist/perx-core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const routerStub = { navigateByUrl: () => ({}) };
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        AuthenticationModule,
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment })],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: Router, useValue: routerStub },
        {
          provide: AuthenticationService,
          useValue: {v4GameOauth: () => {}, getInterruptedUrl: () => null}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to signup on Sign up click', () => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigateByUrl').and.callThrough();
    component.goToSignup();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/signup');
  });

  it('should navigate to forgot password on forgot password click', () => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigateByUrl').and.callThrough();
    component.goToForgotPassword();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/forgot-password');
  });

  it('should navigate to user-info if authenticated', fakeAsync(() => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get(
      AuthenticationService
    );
    const authSpy = spyOn(authenticationService, 'v4GameOauth').and.returnValue(Promise.resolve(true));
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(routerStub, 'navigateByUrl').and.stub();

    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/user-info');
  }));

});
