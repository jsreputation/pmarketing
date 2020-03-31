import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, Type } from '@angular/core';
import { AuthenticationModule, AuthenticationService, NotificationService, ConfigService } from '@perxtech/core';

import { LoginComponent } from './login.component';

import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const notificationServiceStub: Partial<NotificationService> = { $popup: of({}) };
  const routerSub: Partial<Router> = { navigateByUrl: () => Promise.resolve(true) };
  const authenticationServiceStub: Partial<AuthenticationService> = {
    $failedAuth: of(true),
    getInterruptedUrl: () => 'url',
    login: () => of(),
    getAppToken: () => of(),
    getAppAccessToken: () => 'token'
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };
  let debugElement: DebugElement;
  let authService: AuthenticationService;
  let router: Router;
  let authSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: Router, useValue: routerSub },
        { provide: ConfigService, useValue: configServiceStub }
      ],
      imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        RouterTestingModule.withRoutes([{ path: 'home', component: LoginComponent }]),
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        AuthenticationModule,
      ],
      declarations: [LoginComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthenticationService as Type<AuthenticationService>);
    router = debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  beforeEach(() => {
    authSpy = spyOn(authService, 'login').and.returnValue(of(void 0));
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService', () => {
    authSpy.and.returnValue(of(void 0));
    component.onSubmit();
    expect(authSpy).toHaveBeenCalled();
  });

  it('should redirect to home', fakeAsync(() => {
    authSpy.and.returnValue(of(void 0));
    spyOn(router, 'navigateByUrl').and.stub();
    router.navigateByUrl('home');
    fixture.detectChanges();
    component.onSubmit();
    tick();
    expect(router.navigateByUrl).toHaveBeenCalledWith('home');
  }));

  // it('should display error message', fakeAsync(() => {
  //   authSpy.and.returnValue( Observable.throw(new HttpErrorResponse({ status: 401 })));
  //   component.onSubmit();
  //   tick();
  //   fixture.detectChanges();
  //   const el = fixture.debugElement.query(By.css('.error_msg')) as DebugElement;
  //   expect(el.nativeElement.textContent).toBe('Invalid credentials');
  // }));
});
