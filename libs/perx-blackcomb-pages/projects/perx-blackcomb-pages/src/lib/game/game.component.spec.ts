import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { of } from 'rxjs';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { ScratchComponent } from './scratch/scratch.component';
import { GameModule, IGameService, PopupComponent, GameType, IGame } from '@perx/core';
import { MatDialogModule, MatProgressBarModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TranslateModule } from '@ngx-translate/core';

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
  const gameServiceStub: Partial<IGameService> = {
    getGamesFromCampaign: () => of([game]),
    prePlay: () => of()
  };
  const routerStub: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        ShakeComponent,
        TapComponent,
        ScratchComponent,
        PopupComponent,
      ],
      imports: [
        GameModule,
        MatDialogModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: IGameService, useValue: gameServiceStub },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
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
      expect(routerSpy).toHaveBeenCalledWith(['/wallet']);
      expect(getGamesFromCampaignSpy).toHaveBeenCalled();
    }));
  });
});
