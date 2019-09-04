import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  MatIconModule,
  MatToolbarModule,
} from '@angular/material';
import { GameModule, GameService, GameType, NotificationService } from '@perx/core';
import { GameComponent } from './game.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { Type } from '@angular/core';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const routerStub = { navigate: () => ({}) };

  const gameServiceStub = {
    getGamesFromCampaign: () => of()
  };
  const locationStub = {
    back: () => {}
  };
  const notificationServiceStub = { addPopup: () => ({}) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      imports: [ MatIconModule, MatToolbarModule, GameModule ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: { queryParams: of({ campaignId: '1' }) } },
        { provide: GameService, useValue: gameServiceStub },
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
    const gameService = TestBed.get<GameService>(GameService as Type<GameService>);
    const gameServiceSpy = spyOn(gameService, 'getGamesFromCampaign').and.returnValue(
      of([
        {
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
        }
      ])
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

  it('should navigate to congrats screen on gameCompleted', fakeAsync(() => {
    const router = TestBed.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigate');
    component.gameCompleted();
    tick(2000);
    expect(routerSpy).toHaveBeenCalledWith([ '/congrats' ], { queryParams: Object({ gameId: undefined }) });
  }));
});
