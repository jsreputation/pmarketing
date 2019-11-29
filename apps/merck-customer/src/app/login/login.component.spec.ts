import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, ProfileService } from '@perx/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const routerStub = {
      navigateByUrl: () => ({}),
      navigate: () => ({})
    };

    const profileStub = {
      getCustomProperties: () => of({
        questionaire_answered: false
      })
    };

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        {
          provide: AuthenticationService,
          useValue: {
            isAuthorized: () => of({}),
            login: () => {},
            getInterruptedUrl: () => null,
            getAppToken: () => of({}),
            getAppAccessToken: () => 'token'
          }
        },
        { provide: ProfileService, useValue: profileStub}
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
    expect(routerStub.navigate).toHaveBeenCalledWith(['forgot-password'], { state: { country: '852', mobileNo: '' } });
  });

  it('should navigate to user-info if authenticated', fakeAsync(() => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>
    );
    const authSpy = spyOn(authenticationService, 'login').and.returnValue(of({bearer_token: 'SWWERW'}));
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(routerStub, 'navigateByUrl').and.stub();

    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/user-info');
  }));

});
