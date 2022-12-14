import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SurveyModule as PerxSurveyModule,
  AuthenticationService,
  Config,
  IGameService,
  InstantOutcomeService,
  SurveyService,
  ThemesService,
  ConfigService,
  IConfig,
  ProfileService
} from '@perxtech/core';
import { LuckyDrawDetailsComponent } from './lucky-draw-details.component';
import { of, Observable } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IWAppAccessTokenResponse } from '@perxtech/whistler';
import {ReactiveFormsModule} from '@angular/forms';

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

describe('LuckyDrawDetailsComponent', () => {
  let component: LuckyDrawDetailsComponent;
  let fixture: ComponentFixture<LuckyDrawDetailsComponent>;
  const matSnackStub: Partial<MatSnackBar> = {};
  const profileServiceStub: Partial<ProfileService> = {
    setCardNumber: () => of(),
    whoAmI: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LuckyDrawDetailsComponent],
      imports: [
        PerxSurveyModule,
        MatInputModule,
        HttpClientModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatListModule,
        ReactiveFormsModule,
        MatInputModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' },
          { path: 'login', redirectTo: '/' }
        ]),
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
        { provide: ProfileService, useValue: profileServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckyDrawDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
