import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  MatIconModule,
  MatToolbarModule,
} from '@angular/material';
import { GameModule, IGameService, GameType, NotificationService } from '@perx/core';
import { GameComponent } from './game.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { Type } from '@angular/core';

const mockGame = {
  id: 1,
  campaignId: 1,
  type: GameType.pinata,
  remainingNumberOfTries: 3,
  config: {
    stillImg: null,
    breakingImg: null,
    brokenImg: null,
    nbTaps: 3,
  },
  backgroundImg: null,
  texts: {
    title: null,
    subTitle: null,
    button: null,
  },
  results: {
    outcome: null,
    noOutcome: null
  }
};

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const routerStub = { navigate: () => ({}) };

  const gameServiceStub = {
    get: () => of(),
    play: () => {}
  };
  const locationStub = {
    back: () => { }
  };
  const notificationServiceStub = { addPopup: () => ({}) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [MatIconModule, MatToolbarModule, GameModule],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: { queryParams: of({ id: '1' }) } },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: NotificationService, useValue: notificationServiceStub },
      ]
    })
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

  it('should get game id from route, call gameService onInit', fakeAsync(() => {
    const gameService = TestBed.get<IGameService>(IGameService as Type<IGameService>);
    const gameServiceSpy = spyOn(gameService, 'get').and.returnValue(
      of( mockGame)
    );
    component.ngOnInit();
    tick();
    expect(gameServiceSpy).toHaveBeenCalled();
  }));

  describe('goBack', () => {
    it('should call notificationService addPopup if isEnabled is true', () => {
      component.isEnabled = true;
      const notificationService = TestBed.get<NotificationService>(NotificationService as Type<NotificationService>);
      const notificationServiceSpy = spyOn(notificationService, 'addPopup');
      component.goBack();
      expect(notificationServiceSpy).toHaveBeenCalled();
    });

    it('should go back if isEnabled is false', () => {
      component.isEnabled = false;
      const location = TestBed.get<Location>(Location as Type<Location>);
      const locationSpy = spyOn(location, 'back');
      component.goBack();
      expect(locationSpy).toHaveBeenCalled();
    });
  });

  it('should go back on dialogClosed', () => {
    const location = TestBed.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(location, 'back');
    component.dialogClosed();
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should call play on game completed', fakeAsync(() => {
    const gameService = TestBed.get<IGameService>(IGameService as Type<IGameService>);
    const gameServiceSpy = spyOn(gameService, 'play').and.returnValue(
      of()
    );
    component.game = mockGame;
    component.gameCompleted();
    tick(2000);
    expect(gameServiceSpy).toHaveBeenCalled();
  }));
});
