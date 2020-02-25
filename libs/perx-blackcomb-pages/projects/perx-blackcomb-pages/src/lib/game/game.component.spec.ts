import {async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks} from '@angular/core/testing';

import { GameComponent } from './game.component';
import { of, throwError } from 'rxjs';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { ScratchComponent } from './scratch/scratch.component';
import {
  GameModule,
  IGameService,
  GameType,
  IGame,
  AuthenticationService,
  NotificationService,
  ConfigService
} from '@perx/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigToMappedSlotPipe, ConfigToSlicesPipe, SpinComponent } from './spin/spin.component';
import { WInformationCollectionSettingType } from '@perx/whistler';
import {SnakeComponent} from './snake/snake.component';

const gamePi: IGame = {
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
    informationCollectionSetting: WInformationCollectionSettingType.pi_required,
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
    informationCollectionSetting: WInformationCollectionSettingType.signup_required,
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

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  const gameServiceStub: Partial<IGameService> = {
    getGamesFromCampaign: () => of([gamePi]),
    prePlay: () => of(),
    prePlayConfirm: () => of(),
  };
  const routerStub: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };

  const authServiceStub: Partial<AuthenticationService> = {
    getAnonymous: () => true,
  };
  const notificationServiceStub: Partial<NotificationService> = {
    addPopup: () => void 0
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      apiHost: '',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: '',
    })
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
        ConfigToSlicesPipe,
        ConfigToMappedSlotPipe
      ],
      imports: [
        MatProgressBarModule,
        NoopAnimationsModule,
        GameModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: IGameService, useValue: gameServiceStub },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
        { provide: Router, useValue: routerStub },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      // .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [PopupComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should redirect to /wallet if the route param id is not a valid campaign id.', fakeAsync(() => {
      const router: Router = fixture.debugElement.injector.get<Router>(
        Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');
      const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(
        IGameService as Type<IGameService>);

      const getGamesFromCampaignSpy = spyOn(gameService, 'getGamesFromCampaign')
        .and.returnValue(of([]));

      component.ngOnInit();
      tick(1000);
      fixture.detectChanges();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['/wallet']);
      expect(getGamesFromCampaignSpy).toHaveBeenCalled();
    }));
  });

  it('should call redirectUrlAndPopup', fakeAsync( () => {
    const authService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>);
    const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(IGameService as Type<IGameService>);
    const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    spyOn(authService, 'getAnonymous').and.returnValue(false);
    spyOn(gameService, 'getGamesFromCampaign').and.returnValue(of([gameSignup]));
    const error = 'error';
    const spy = spyOn(gameService, 'prePlay').and.returnValue(throwError(error));
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
    const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(IGameService as Type<IGameService>);
    const spy = spyOn(gameService, 'prePlay').and.returnValue(of({ id: 3, voucherIds: [1, 2, 3] }));
    component.ngOnInit();
    component.loadPreplay();
    expect(spy).toHaveBeenCalled();
    expect(component.willWin).toBe(true);
  });

  it('should set willWin false value', () => {
    const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(IGameService as Type<IGameService>);
    const spy = spyOn(gameService, 'prePlay').and.returnValue(of({ id: 3, voucherIds: [] }));
    component.ngOnInit();
    component.loadPreplay();
    expect(spy).toHaveBeenCalled();
    expect(component.willWin).toBe(false);
  });
});
