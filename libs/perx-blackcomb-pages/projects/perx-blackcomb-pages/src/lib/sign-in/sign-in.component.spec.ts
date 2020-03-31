import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Type } from '@angular/core';

import { of, Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import {
  Config,
  IGameService,
  InstantOutcomeService,
  AuthenticationService,
  NotificationService,
  SurveyService,
  ConfigService,
  IConfig,
} from '@perxtech/core';

import { SignInComponent } from './sign-in.component';
import { Location } from '@angular/common';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  const notificationServiceStub: Partial<NotificationService> = {
    addPopup: () => { }
  };

  const configStub: Partial<Config> = {
    preAuth: false
  };

  const gameServiceStub: Partial<IGameService> = {
    prePlayConfirm: () => of()
  };

  const instantOutcomeServiceStub: Partial<InstantOutcomeService> = {
    prePlayConfirm: () => of()
  };

  const authServiceStub: Partial<AuthenticationService> = {
    getUserId: () => 1,
    autoLogin: () => of(void 0),
    mergeUserById: () => of(void 0),
    getPI: () => '',
    getUserAccessToken: () => '',
    getAnonymous: () => true,
    logout: () => { },
    savePI: () => void 0,
    saveUserId: () => void 0,
    saveUserAccessToken: () => void 0,
    saveAnonymous: () => void 0
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: <T>(): Observable<IConfig<T>> => of({
      custom: {}
    } as IConfig<T>)
  };

  const surveyServiceStub: Partial<SurveyService> = {
    postSurveyAnswer: () => of({ hasOutcomes: true })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignInComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'home', redirectTo: '/' },
          { path: 'wallet', redirectTo: '/' }
        ]),
      ],
      providers: [
        { provide: Config, useValue: configStub },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: InstantOutcomeService, useValue: instantOutcomeServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: SurveyService, useValue: surveyServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit', () => {
    const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(IGameService as Type<IGameService>);
    const location: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    spyOn(location, 'getState').and.returnValue({
      popupData: {},
      engagementType: 'game',
      collectInfo: true,
      transactionId: 3
    });
    component.ngOnInit();
    component.piField.setValue('test');

    const spySubmit = spyOn(component, 'onSubmit').and.callThrough();
    spyOn(gameService, 'prePlayConfirm').and.returnValue(of(void 0));

    component.onSubmit();
    expect(spySubmit).toHaveBeenCalled();
  });
});
