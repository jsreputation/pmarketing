import {
  async,
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { GameComponent } from './game.component';
import { of, throwError } from 'rxjs';
import {
  AuthenticationService,
  CampaignState,
  CampaignType,
  ConfigService,
  ErrorMessageService,
  ExpireTimerComponent,
  GameModule,
  GameType,
  ICampaign,
  ICampaignService,
  IGame,
  IGameService,
  ITheme,
  NotificationService,
  OutcomeType,
  RewardPopupComponent,
  SettingsService,
  ThemesService,
} from '@perxtech/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { WInformationCollectionSettingType } from '@perxtech/whistler';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import {
  ShakeComponent,
  SpinComponent,
  SnakeComponent,
  PlinkoComponent,
  TapComponent,
  ScratchComponent,
} from '@perxtech/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';

const game: IGame = {
  id: 1,
  campaignId: 1,
  type: GameType.plinko,
  remainingNumberOfTries: 1,
  config: {
    stillImg: '',
    brokenImg: '',
    nbTaps: 1,
  },
  texts: {},
  results: {},
  displayProperties: {
    noRewardsPopUp: {
      headLine: 'test headline',
      subHeadLine: 'test subHeadline',
      buttonTxt: 'btnText',
    },
    successPopUp: {
      headLine: 'test headline',
      subHeadLine: 'test subHeadline',
      buttonTxt: 'btnText',
    },
  },
};
//
// const gamePi: IGame = {
//   id: 1,
//   campaignId: 1,
//   type: GameType.pinata,
//   remainingNumberOfTries: 1,
//   config: {
//     stillImg: '',
//     brokenImg: '',
//     nbTaps: 1,
//   },
//   texts: {},
//   results: {},
//   displayProperties: {
//     informationCollectionSetting: WInformationCollectionSettingType.pi_required,
//     noRewardsPopUp: {
//       headLine: 'test headline',
//       subHeadLine: 'test subHeadline',
//       buttonTxt: 'btnText',
//     },
//     successPopUp: {
//       headLine: 'test headline',
//       subHeadLine: 'test subHeadline',
//       buttonTxt: 'btnText',
//     },
//   },
// };

const gameSignup: IGame = {
  id: 1,
  campaignId: 1,
  type: GameType.pinata,
  remainingNumberOfTries: 1,
  config: {
    stillImg: '',
    brokenImg: '',
    nbTaps: 1,
  },
  texts: {},
  results: {},
  displayProperties: {
    informationCollectionSetting:
      WInformationCollectionSettingType.signup_required,
    noRewardsPopUp: {
      headLine: 'test headline',
      subHeadLine: 'test subHeadline',
      buttonTxt: 'btnText',
    },
    successPopUp: {
      headLine: 'test headline',
      subHeadLine: 'test subHeadline',
      buttonTxt: 'btnText',
    },
  },
};

const campaign: ICampaign = {
  id: 1,
  name: 'abc',
  description: 'abc',
  type: CampaignType.game,
  state: CampaignState.active,
  endsAt: null,
  rewards: [],
  thumbnailUrl: '',
  customFields: {},
};

const mockTheme: ITheme = {
  name: 'theme',
  properties: {
    '--background': 'red',
    '--font_color': 'black',
  },
};

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  // @ts-ignore
  let notificationService: NotificationService;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of(mockTheme),
  };
  const gameServiceStub: Partial<IGameService> = {
    getGamesFromCampaign: () => of([game]),
    prePlay: () => of(),
    prePlayConfirm: () => of(),
    play: () =>
      of({
        vouchers: [],
        points: [],
        badges: [],
        prizeSets: [
          {
            transactionId: 10,
            prizeSetId: 1,
            outcomeType: OutcomeType.prizeSet,
            state: 'completed',
          },
        ],
        rawPayload: [],
      }),
  };
  const routerStub: Partial<Router> = {
    navigate: () => Promise.resolve(true),
  };
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaign: () => of(campaign),
  };
  const authServiceStub: Partial<AuthenticationService> = {
    getAnonymous: () => true,
  };
  const notificationServiceStub: Partial<NotificationService> = {
    addPopup: () => void 0,
    // addSnack: () => void 0,
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () =>
      of({
        apiHost: '',
        production: false,
        preAuth: false,
        isWhistler: false,
        baseHref: '',
        showPrizeSetOutcome: true,
      }),
  };
  const activatedRouteStub: Partial<ActivatedRoute> = {
    queryParams: of({ params: { flags: 'nonav, chromeless' } }),
    params: of({ id: 1 }),
  };
  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () =>
      of({
        showPrizeSetOutcome: true,
      }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        ShakeComponent,
        TapComponent,
        ScratchComponent,
        SpinComponent,
        SnakeComponent,
        PlinkoComponent,
        RewardPopupComponent,
        ExpireTimerComponent,
      ],
      imports: [
        MatProgressBarModule,
        NoopAnimationsModule,
        GameModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        MatIconModule,
        SharedModule,
      ],
      providers: [
        { provide: IGameService, useValue: gameServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
        {
          provide: ErrorMessageService,
          useValue: {
            getErrorMessageByErrorCode: () => of(''),
          },
        },
        { provide: SettingsService, useValue: settingsServiceStub },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [RewardPopupComponent] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    notificationService = TestBed.get<NotificationService>(NotificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should redirect to /wallet if the route param id is not a valid campaign id.', fakeAsync(() => {
      const router: Router = fixture.debugElement.injector.get<Router>(
        Router as Type<Router>
      );
      const routerSpy = spyOn(router, 'navigate');
      const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(
        IGameService as Type<IGameService>
      );

      const getGamesFromCampaignSpy = spyOn(
        gameService,
        'getGamesFromCampaign'
      ).and.returnValue(of([]));

      component.ngOnInit();
      tick(1000);
      fixture.detectChanges();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['/wallet']);
      expect(getGamesFromCampaignSpy).toHaveBeenCalled();
    }));
  });

  it('should call redirectUrlAndPopup', fakeAsync(() => {
    const authService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>
    );
    const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(
      IGameService as Type<IGameService>
    );
    const router: Router = fixture.debugElement.injector.get<Router>(
      Router as Type<Router>
    );
    spyOn(authService, 'getAnonymous').and.returnValue(false);
    spyOn(gameService, 'getGamesFromCampaign').and.returnValue(
      of([gameSignup])
    );
    const error = 'error';
    const spy = spyOn(gameService, 'prePlay').and.returnValue(
      throwError(error)
    );
    const routerSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    component.loadPreplay();
    component.preplayGameCompleted();
    tick(1000);
    fixture.detectChanges();
    tick();
    discardPeriodicTasks();
    expect(spy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/wallet']);
  }));

  it('should set willWin true value', () => {
    const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(
      IGameService as Type<IGameService>
    );
    spyOn(gameService, 'getGamesFromCampaign').and.returnValue(of([game]));
    const spy = spyOn(gameService, 'prePlay').and.returnValue(
      of({ id: 3, voucherIds: [1, 2, 3] })
    );
    component.ngOnInit();
    component.loadPreplay();
    expect(spy).toHaveBeenCalled();
    expect(component.willWin).toBe(true);
  });

  it('should set willWin false value', () => {
    const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(
      IGameService as Type<IGameService>
    );
    spyOn(gameService, 'getGamesFromCampaign').and.returnValue(of([game]));
    const spy = spyOn(gameService, 'prePlay').and.returnValue(
      of({ id: 3, voucherIds: [] })
    );
    component.ngOnInit();
    component.loadPreplay();
    expect(spy).toHaveBeenCalled();
    expect(component.willWin).toBe(false);
  });

  it('should set willWin true value when has prize set outcome', () => {
    const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(
      IGameService as Type<IGameService>
    );
    spyOn(gameService, 'getGamesFromCampaign').and.returnValue(of([game]));
    const spy = spyOn(gameService, 'prePlay').and.returnValue(
      of({
        id: 3,
        voucherIds: [],
        prizeSets: [
          {
            transactionId: 10,
            prizeSetId: 1,
            outcomeType: OutcomeType.prizeSet,
            state: 'completed',
          },
        ],
      })
    );
    component.ngOnInit();
    component.loadPreplay();
    expect(spy).toHaveBeenCalled();
    expect(component.willWin).toBe(true);
  });

  it('should be displayed in popup when button view prize set when has prize set outcome', fakeAsync(() => {
    const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(
      IGameService as Type<IGameService>
    );
    spyOn(gameService, 'getGamesFromCampaign').and.returnValue(of([game]));
    spyOn(gameService, 'play').and.returnValue(
      of({
        id: 3,
        prizeSets: [
          {
            transactionId: 1,
            prizeSetId: 2,
            outcomeType: OutcomeType.prizeSet,
          },
        ],
        voucherIds: [1, 2, 3],
      })
    );
    component.ngOnInit();
    component.loadPlay();
    tick();
    component.redirectUrlAndPopUp();
    expect(component.successPopUp.buttonTxt).toEqual(
      'PRIZE_SET.OUTCOME_SUCCESS_TITLE'
    );
  }));
});
