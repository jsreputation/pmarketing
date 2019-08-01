import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '@perx/core/dist/perx-core';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const routerStub = { navigateByUrl: () => ({}),
                         navigate: () => ({})};
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
        ],
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
    spyOn(routerStub, 'navigate').and.callThrough();
    component.goToForgotPassword();
    expect(routerStub.navigate).toHaveBeenCalledWith(['forgot-password'], { state: { country: '+852', mobileNo: '' } });
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
