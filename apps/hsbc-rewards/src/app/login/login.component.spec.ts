import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { AuthenticationModule, CognitoModule, OauthModule, AuthenticationService, NotificationService } from '@perx/core';

import { LoginComponent } from './login.component';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const notificationServiceStub = { $popup: { subscribe: () => ({}) } };
  const routerSub = { navigateByUrl: (url)=>{ } }
  const authenticationServiceStub = { 
    failedAuthObservable: new BehaviorSubject(true), 
    v4GameOauth: new BehaviorSubject(true), 
    getInterruptedUrl: ()=> null 
  };
  let debugElement: DebugElement;
  let authService:AuthenticationService;
  let router: Router;
  let authSpy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: Router, useValue: routerSub}
      ],
      imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        RouterTestingModule.withRoutes([ { path: 'home', component: LoginComponent }]),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        AuthenticationModule,
        NoopAnimationsModule,
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
      ],
      declarations: [LoginComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthenticationService);
    router = debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  beforeEach(()=>{
    authSpy = spyOn(authService, 'v4GameOauth').and.returnValue(Promise.resolve(true));
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService', () => {
    authSpy.and.returnValue(Promise.resolve(true));
    component.onSubmit();
    expect(authSpy).toHaveBeenCalled();
  })

  it('should redirect to home', fakeAsync(() => {
    authSpy.and.returnValue(Promise.resolve(true));
    spyOn(router, 'navigateByUrl').and.stub();
    fixture.detectChanges();
    component.onSubmit();
    tick();
    expect(router.navigateByUrl).toHaveBeenCalledWith('home')
  }))

  it('should display error message', fakeAsync(()=>{
    authSpy.and.returnValue(Promise.reject(new HttpErrorResponse({status:401})));
    component.onSubmit();
    tick();
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.error_msg')) as DebugElement;
    expect(el.nativeElement.textContent).toBe('Invalid credentials');
  }))
});
