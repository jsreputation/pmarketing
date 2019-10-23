import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { of } from 'rxjs';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { GameModule, IGameService, PopupComponent, GameType, IGame, VoucherState } from '@perx/core';
import { MatDialogModule, MatProgressBarModule, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const game: IGame = {
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
  };
  const gameServiceStub = {
    getGamesFromCampaign: () => of([game]),
    play: () => of()
  };
  const routerStub = {
    navigate: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, ShakeComponent, TapComponent, PopupComponent],
      imports: [
        GameModule,
        MatDialogModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: IGameService, useValue: gameServiceStub },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1}) } },
        { provide: Router, useValue: routerStub },
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [PopupComponent] } })
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
      expect(routerSpy).toHaveBeenCalledWith([ '/wallet' ]);
      expect(getGamesFromCampaignSpy).toHaveBeenCalled();
    }));
  });

  describe('gameCompleted', () => {
    let dialog;
    let dialogSpy;

    beforeEach(() => {
      dialog = TestBed.get(MatDialog);
      dialogSpy = spyOn(dialog, 'open');
    });

    it('should query gameService/play when the game completes', fakeAsync(() => {
      const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(
        IGameService as Type<IGameService>);

      const gameServiceSpy = spyOn(gameService, 'play').and.returnValue(of({
        vouchers: [],
        rawPayload: '',
      }));

      component.gameCompleted();
      tick(10000);
      expect(gameServiceSpy).toHaveBeenCalled();
    }));

    it('When, the game completes and gameService/play succeeds with one or more voucher, a popup should be displayed with the title Congratulations!', fakeAsync(() => {
      const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(
        IGameService as Type<IGameService>);
      const gameServiceSpy = spyOn(gameService, 'play').and.returnValue(of({
        vouchers: [{
          id: 1,
          reward: null,
          state: VoucherState.issued,
          code: '',
          expiry: new Date(),
          redemptionDate: new Date(),
        }],
        rawPayload: '',
      }));

      dialogSpy = dialogSpy.and.returnValue({ afterClosed: () => of(true) });

      component.gameCompleted();
      tick(10000);
      fixture.detectChanges();
      expect(gameServiceSpy).toHaveBeenCalled();
      expect(dialogSpy).toHaveBeenCalledWith(PopupComponent,
        { data:
          { title: 'Congratulations!',
            text: 'You earned 1 rewards',
            buttonTxt: 'View Rewards',
            imageUrl: 'assets/congrats_image.png'
          }
        }
      );
    }));

    it('should query gameService/play when the game completes', fakeAsync(() => {
      const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(
        IGameService as Type<IGameService>);
      const gameServiceSpy = spyOn(gameService, 'play').and.returnValue(of({
        vouchers: [],
        rawPayload: '',
      }));

      dialogSpy = dialogSpy.and.returnValue({ afterClosed: () => of(true) });

      component.gameCompleted();
      tick(10000);
      fixture.detectChanges();
      expect(gameServiceSpy).toHaveBeenCalled();
      expect(dialogSpy).toHaveBeenCalledWith(PopupComponent, { data: Object({ title: 'Thanks for playing', text: 'Unfortunately, you did not win anything this time', buttonTxt: 'Go to Wallet' }) });
    }));

  });
});
