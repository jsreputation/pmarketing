import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthenticationService, TokenStorage } from '@perx/core';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from '@perx/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import {
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,
} from '@angular/material';
import { SalesContactComponent } from '../sales-contact/sales-contact.component';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const routerStub = { navigateByUrl: () => ({}) };
    const tokenStorageStub = { setAppInfoProperty: () => ({}) };

    TestBed.configureTestingModule({
      declarations: [LoginComponent, SalesContactComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSelectModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        BrowserAnimationsModule,
        AuthenticationModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        {
          provide: AuthenticationService,
          useValue: {
            login: () => { },
            getInterruptedUrl: () => null,
            getAppToken: () => of({}),
            getAppAccessToken: () => 'token'
          }
        },
        { provide: TokenStorage, useValue: tokenStorageStub }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to reset onForgotPassword click', () => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigateByUrl').and.callThrough();
    component.onForgotPassword();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/reset');
  });

  it('should navigate to home if authenticated', fakeAsync(() => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>
    );
    component.loginForm.controls['name'].setValue('test');
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('test1234');

    const authSpy = spyOn(authenticationService, 'login').and.returnValue(of({bearer_token: 'SWWERW'}));
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(routerStub, 'navigateByUrl').and.stub();

    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/home');
  }));

});
