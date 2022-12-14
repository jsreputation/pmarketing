import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  AuthenticationService,
  Config,
  ConfigService,
  IConfig,
  IGameService,
  InstantOutcomeService,
  SurveyModule as PerxSurveyModule,
  SurveyService,
  ThemesService
} from '@perxtech/core';
import { SignUpComponent } from './sign-up.component';
import { Observable, of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IWAppAccessTokenResponse } from '@perxtech/whistler';
import { Type } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

const configStub: Partial<Config> = {
  preAuth: false
};

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: <T>(): Observable<IConfig<T>> => of({
    apiHost: '',
    production: false,
    preAuth: false,
    isWhistler: false,
    baseHref: '',
    showSubtitleLogin: true
  })
};

const gameServiceStub: Partial<IGameService> = {
  prePlayConfirm: () => of()
};

const instantOutcomeServiceStub: Partial<InstantOutcomeService> = {
  prePlayConfirm: () => of()
};

const locationStub: Partial<Location> = {
  getState: () => { }
};

const surveyServiceStub: Partial<SurveyService> = {
  postSurveyAnswer: () => of()
};

const authServiceStub: Partial<AuthenticationService> = {
  logout: () => { },
  getAppToken: () => of({} as IWAppAccessTokenResponse),
  getAppAccessToken: () => 'token',
  signup: () => of()
};
const themeServiceStub: Partial<ThemesService> = {
  getThemeSetting: () => of()
};

const activatedRouteStub: Partial<ActivatedRoute> = {
  data: of(),
  queryParams: of({})
};
const formBuilder: FormBuilder = new FormBuilder();

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  const matSnackStub: Partial<MatSnackBar> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        PerxSurveyModule,
        MatInputModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatSelectModule,
        NoopAnimationsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' },
          { path: 'login', redirectTo: '/' }
        ]),
        MatProgressSpinnerModule,
        MatIconModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: matSnackStub },
        { provide: Config, useValue: configStub },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: InstantOutcomeService, useValue: instantOutcomeServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: SurveyService, useValue: surveyServiceStub },
        { provide: ThemesService, useValue: themeServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: MatDatepickerModule },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.signupForm = formBuilder.group({
      lastName: [ '', Validators.required ],
      dob: [ '', Validators.required ],
      countryCode: [ '', Validators.required ],
      mobileNo: [ '', [ Validators.required, Validators.pattern('^[0-9]*$') ] ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ],
      confirmPassword: [ '', Validators.required ],
      engineNumber: [ '', Validators.required ],
    });

    component.signupForm.setValue({
      lastName: 'Doe',
      dob: '1-1-1970',
      countryCode: '123456',
      mobileNo: '123456',
      password: 'qwerty123',
      confirmPassword: 'qwerty123',
      engineNumber: '1555888'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should call readAppConfig, getThemeSetting, getAppAccessToken and appAccessTokenFetched to be true', fakeAsync(() => {
      const themesService: ThemesService = fixture.debugElement.injector.get<ThemesService>(
        ThemesService as Type<ThemesService>
      );
      const themesServiceSpy = spyOn(themesService, 'getThemeSetting');

      const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
        AuthenticationService as Type<AuthenticationService>
      );
      const getAppAccessTokenSpy = spyOn(authenticationService, 'getAppAccessToken').and.returnValue('token');

      component.ngOnInit();
      tick();
      fixture.detectChanges();
      expect(themesServiceSpy).toHaveBeenCalled();
      expect(getAppAccessTokenSpy).toHaveBeenCalled();
      expect(component.appAccessTokenFetched).toBe(true);
    }));

    it('should call getAppToken and set appAccessTokenFetched to true if getAppAccessToken returns empty', fakeAsync(() => {
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
      fixture.detectChanges();
      expect(getAppAccessTokenSpy).toHaveBeenCalled();
      expect(getAppTokenSpy).toHaveBeenCalled();
      expect(component.appAccessTokenFetched).toBe(true);
    }));

    // it('signup form should contain required fields', fakeAsync(() => {
    //   /**
    //    * as of this commit the required fields in BE are
    //    * - last_name
    //    * - birthday
    //    * - personal_properties->engine_number
    //    */
    //   const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
    //     AuthenticationService as Type<AuthenticationService>
    //   );
    //   const signupSpy = spyOn(authenticationService, 'signup').and.returnValue(of({}));
    //
    //   component.ngOnInit();
    //   tick();
    //   component.onSubmit();
    //   expect(component.signupForm.contains('lastname')).toBe(true);
    //   expect(component.signupForm.contains('dob')).toBe(true);
    //   expect(component.signupForm.contains('engineNumber')).toBe(true);
    //   expect(signupSpy).toBeCalled();
    // }));
  });

});
