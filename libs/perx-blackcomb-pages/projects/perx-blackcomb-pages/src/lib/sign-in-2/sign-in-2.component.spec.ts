import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignIn2Component } from './sign-in-2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService, Config, ConfigService, ThemesService } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { IWAppAccessTokenResponse } from '@perxtech/whistler';
import { Type } from '@angular/core';
import { Router } from '@angular/router';

const configStub: Partial<Config> = {
  preAuth: false
};

describe('SignIn2Component', () => {
  let component: SignIn2Component;
  let fixture: ComponentFixture<SignIn2Component>;

  const authenticationServiceStub: Partial<AuthenticationService> = {
    getUserAccessToken: () => '',
    getAppToken: () => of({} as IWAppAccessTokenResponse),
    getAppAccessToken: () => 'token',
    getInterruptedUrl: () => '',
    login: () => of()
  };

  const themeServiceStub: Partial<ThemesService> = {
    getActiveTheme: () => of(),
    getThemeSetting: () => of()
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      redirectAfterLogin: '/home',
      apiHost: 'string',
      production: true,
      preAuth: true,
      isWhistler: true,
      baseHref: ''
    })
  };

  const routerStub: Partial<Router> = {
    navigateByUrl: () => Promise.resolve(true),
    getCurrentNavigation: () => null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignIn2Component],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' },
          { path: 'login', redirectTo: '/' }
        ]),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ThemesService, useValue: themeServiceStub },
        { provide: Config, useValue: configStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignIn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should call getAppAccessToken and return token and set appAccessTokenFetched to true', fakeAsync(() => {
      const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
        AuthenticationService as Type<AuthenticationService>
      );
      const getAppAccessTokenSpy = spyOn(authenticationService, 'getAppAccessToken').and.returnValue('token');
      component.ngOnInit();
      tick();
      expect(getAppAccessTokenSpy).toHaveBeenCalled();
      expect(component.appAccessTokenFetched).toBe(true);
    }));

    it('should call getAppToken if getAppAccessToken return empty string and set appAccessTokenFetched to true', fakeAsync(() => {
      const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
        AuthenticationService as Type<AuthenticationService>
      );
      const getAppAccessTokenSpy = spyOn(authenticationService, 'getAppAccessToken').and.returnValue('');
      const getAppTokenSpy = spyOn(authenticationService, 'getAppToken').and.returnValue(of({
        access_token: 'token',
        token_type: 'bearer',
        expires_in: 1,
        created_at: 1
      }));
      component.ngOnInit();
      tick();
      expect(getAppAccessTokenSpy).toHaveBeenCalled();
      expect(getAppTokenSpy).toHaveBeenCalled();
      expect(component.appAccessTokenFetched).toBe(true);
    }));
  });

  it('should call navigateByUrl on redirectAfterLogin', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigateByUrl').and.callThrough();
    component.redirectAfterLogin();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should call login onSubmit', fakeAsync(() => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>
    );
    const loginSpy = spyOn(authenticationService, 'login').and.returnValue(of());
    component.onSubmit();
    tick();
    expect(loginSpy).toHaveBeenCalled();
  }));
});
