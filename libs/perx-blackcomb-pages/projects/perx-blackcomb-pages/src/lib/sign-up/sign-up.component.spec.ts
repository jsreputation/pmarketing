import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  SurveyModule as PerxSurveyModule,
  IFormsService,
  AuthenticationService,
  Config,
  IGameService,
  InstantOutcomeService,
  SurveyService,
  ThemesService,
  ConfigService,
  IConfig,
  IAnswer
} from '@perxtech/core';
import { SignUpComponent } from './sign-up.component';
import { of, Observable, throwError } from 'rxjs';
import { MatSnackBar, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IWAppAccessTokenResponse } from '@perxtech/whistler';
import { Type } from '@angular/core';

const answers: IAnswer[] = [
  {
    questionId: '1',
    content: 'test'
  }
];

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
  getUserId: () => 1,
  autoLogin: () => of(),
  mergeUserById: () => of(void 0),
  getPI: () => '',
  getUserAccessToken: () => '',
  getAnonymous: () => true,
  logout: () => { },
  getAppToken: () => of({} as IWAppAccessTokenResponse),
  getAppAccessToken: () => 'token',
  createUserAndAutoLogin: () => of(),
  saveUserId: () => void 0,
  saveUserAccessToken: () => void 0,
  savePI: () => void 0,
  saveAnonymous: () => void 0
};
const themeServiceStub: Partial<ThemesService> = {
  getThemeSetting: () => of()
};

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  const formSvcStub: Partial<IFormsService> = {
    getSignupForm: () => of({
      title: '',
      results: {},
      questions: []
    })
  };
  const matSnackStub: Partial<MatSnackBar> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        PerxSurveyModule,
        MatInputModule,
        HttpClientModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' },
          { path: 'login', redirectTo: '/' }
        ]),
      ],
      providers: [
        { provide: IFormsService, useValue: formSvcStub },
        { provide: MatSnackBar, useValue: matSnackStub },
        { provide: Config, useValue: configStub },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: InstantOutcomeService, useValue: instantOutcomeServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: SurveyService, useValue: surveyServiceStub },
        { provide: ThemesService, useValue: themeServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should call readAppConfig, getThemeSetting, getSignupForm, getPI, getUserAccessToken, getAnonymous, getAppAccessToken, getState and appAccessTokenFetched to be true', fakeAsync(() => {
      const themesService: ThemesService = fixture.debugElement.injector.get<ThemesService>(
        ThemesService as Type<ThemesService>
      );
      const themesServiceSpy = spyOn(themesService, 'getThemeSetting');

      const formsService: IFormsService = fixture.debugElement.injector.get<IFormsService>(
        IFormsService as Type<IFormsService>
      );
      const formsServiceSpy = spyOn(formsService, 'getSignupForm');

      const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
        AuthenticationService as Type<AuthenticationService>
      );
      const getPISpy = spyOn(authenticationService, 'getPI');
      const getUserAccessTokenSpy = spyOn(authenticationService, 'getUserAccessToken');
      const getAnonymousSpy = spyOn(authenticationService, 'getAnonymous');
      const getAppAccessTokenSpy = spyOn(authenticationService, 'getAppAccessToken').and.returnValue('token');

      const location: Location = fixture.debugElement.injector.get<Location>(
        Location as Type<Location>
      );
      const locationSpy = spyOn(location, 'getState');

      component.ngOnInit();
      tick();
      fixture.detectChanges();
      expect(themesServiceSpy).toHaveBeenCalled();
      expect(formsServiceSpy).toHaveBeenCalled();
      expect(getPISpy).toHaveBeenCalled();
      expect(getUserAccessTokenSpy).toHaveBeenCalled();
      expect(getAnonymousSpy).toHaveBeenCalled();
      expect(getAppAccessTokenSpy).toHaveBeenCalled();
      expect(locationSpy).toHaveBeenCalled();
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
  });

  it('it should update answers base on the param passed', () => {
    component.updateFormStatus(answers);
    expect(component.answers.length).toBe(1);
    expect(component.answers[0].content).toBe('test');
  });

  it('should call createUserAndAutoLogin onSubmit', fakeAsync(() => {
    const answerPi: IAnswer[] = [
      {
        questionId: 'primary_identifier',
        content: 'test'
      }
    ];

    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>
    );

    const authSpy = spyOn(authenticationService, 'createUserAndAutoLogin').and.returnValue(of(void 0));

    component.answers = answerPi;
    component.onSubmit();
    tick();
    expect(authSpy).toHaveBeenCalled();
  }));

  it('should set error message', fakeAsync(() => {
    component.updateErrorMessage('error');
    expect(component.errorMessage).toBe('error');
  }));

  it('should call createUserAndAutoLogin onSubmit and throwError', fakeAsync(() => {
    const answerPi: IAnswer[] = [
      {
        questionId: 'primary_identifier',
        content: 'test'
      }
    ];

    const location: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>
    );
    spyOn(location, 'getState').and.returnValue({ popupData: {}, engagementType: 'str', collectInfo: true });
    const error = {
      error: {
        message: 'error'
      }
    };

    const authSpy = spyOn(authenticationService, 'createUserAndAutoLogin').and.returnValue(throwError(error));

    component.answers = answerPi;
    component.onSubmit();
    tick();
    expect(authSpy).toHaveBeenCalled();
  }));

  it('should call submitDataAndCollectInformation', () => {
    const stateData = {
      popupData: { title: 'test' },
      engagementType: 'game',
      collectInfo: true,
    };
    const location: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    spyOn(location, 'getState').and.returnValue(stateData);

    component.answers = [
      {
        questionId: 'primary_identifier',
        content: 'test'
      }
    ];

    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>
    );
    const authSpy = spyOn(authenticationService, 'createUserAndAutoLogin').and.returnValue(of(void 0));
    spyOn(authenticationService, 'autoLogin').and.returnValue(throwError('error'));

    component.ngOnInit();
    component.onSubmit();

    expect(authSpy).toHaveBeenCalled();
  });

});
