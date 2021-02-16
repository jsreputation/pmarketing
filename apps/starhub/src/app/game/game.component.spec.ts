import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  MatIconModule,
  MatToolbarModule,
} from '@angular/material';
import {
  GameModule,
  IGameService,
  GameType,
  ICampaignService,
  NotificationService,
  IPlayOutcome,
  IGame,
  ConfigService
} from '@perxtech/core';
import { GameComponent } from './game.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { ScratchComponent, ShakeComponent, TapComponent, SpinComponent } from '@perxtech/blackcomb-pages';
import { Type } from '@angular/core';

const mockGame: IGame = {
  id: 1,
  campaignId: 1,
  type: GameType.pinata,
  remainingNumberOfTries: 3,
  config: {
    stillImg: '',
    breakingImg: '',
    brokenImg: '',
    nbTaps: 3,
  },
  backgroundImg: undefined,
  texts: {
    title: undefined,
    subTitle: undefined,
    button: undefined,
  },
  results: {
    outcome: undefined,
    noOutcome: {
      title: 'test',
      subTitle: 'test',
      button: 'test'
    }
  }
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of({
    apiHost: '',
    production: false,
    preAuth: false,
    isWhistler: false,
    baseHref: ''
  })
};
const campaignServiceStub: Partial<ICampaignService> = {
  getCampaign: () => of()
};
describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const routerStub = { navigate: () => ({}) };
  let gameService: IGameService;
  let notificationService: NotificationService;
  const gameServiceStub: Partial<IGameService> = {
    get: () => of(),
    play: () => of()
  };
  const locationStub: Partial<Location> = {
    back: () => { }
  };
  const notificationServiceStub: Partial<NotificationService> = { addPopup: () => ({}) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, ScratchComponent, ShakeComponent, TapComponent, SpinComponent],
      imports: [MatIconModule, MatToolbarModule, GameModule],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: { queryParams: of({ id: '1' }) } },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    gameService = TestBed.get<IGameService>(IGameService as Type<IGameService>);
    notificationService = TestBed.get<NotificationService>(NotificationService as Type<NotificationService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get game id from route, call gameService onInit', fakeAsync(() => {
    // const gameService = TestBed.get<IGameService>(IGameService as Type<IGameService>);
    const gameServiceSpy = spyOn(gameService, 'get').and.returnValue(
      of(mockGame)
    );
    // because now we are doing | async in the template
    component.loadGame().subscribe();
    tick();
    expect(gameServiceSpy).toHaveBeenCalled();
  }));

  it('should go back on dialogClosed', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigate').and.callThrough();
    component.dialogClosed();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should call play on game completed', fakeAsync(() => {
    // const gameService = TestBed.get<IGameService>(IGameService as Type<IGameService>);
    const gameServiceSpy = spyOn(gameService, 'play').and.returnValue(
      of()
    );
    component.game = mockGame;
    component.gameCompleted();
    tick(2000);
    expect(gameServiceSpy).toHaveBeenCalled();
  }));

  it('should handle gameComplited', fakeAsync(() => {
    component.game = mockGame;
    spyOn(gameService, 'play').and.returnValue(of({ vouchers: [], rawPayload: {} } as IPlayOutcome));
    const spyComponent = spyOn(notificationService, 'addPopup');
    component.gameCompleted();
    tick();
    expect(spyComponent).toHaveBeenCalled();
  }));
});
