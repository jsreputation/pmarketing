import { Type } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService, Config, ConfigService, ILoyalty, LoyaltyService, ThemesService } from '@perxtech/core';
import { IWAppAccessTokenResponse } from '@perxtech/whistler';
import { Observable, of } from 'rxjs';
import * as uuid from 'uuid';
import { SignIn2Component } from './sign-in-2.component';

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

  const activatedRouteStub: Partial<ActivatedRoute> = {
    data: of()
  };

  const routerStub: Partial<Router> = {
    navigateByUrl: () => Promise.resolve(true),
    getCurrentNavigation: () => null
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalty: (): Observable<ILoyalty> => of(),
    getLoyalties: (): Observable<ILoyalty[]> => of([])
  };
  const formBuilder: FormBuilder = new FormBuilder();

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
        MatProgressSpinnerModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ThemesService, useValue: themeServiceStub },
        { provide: Config, useValue: configStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignIn2Component);
    component = fixture.componentInstance;
    component.loginForm = formBuilder.group({
      customerID: [ '', Validators.required ],
      countryCode: [ '', Validators.required ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    });

    component.loginForm.setValue({
      countryCode: '65',
      customerID: '123456',
      password: 'qwerty123',
    });
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

  it('should call login onSubmit', fakeAsync(() => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>
    );
    const loginSpy = spyOn(authenticationService, 'login').and.returnValue(of());
    component.loginForm.patchValue({
      customerID: uuid.v4(),
      password: uuid.v4(),
      countryCode: '65'
    });
    component.onSubmit();
    tick();
    expect(loginSpy).toHaveBeenCalled();
  }));
});
