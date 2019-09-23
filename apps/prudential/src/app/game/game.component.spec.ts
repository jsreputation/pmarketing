import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { RouterModule, Router } from '@angular/router';
import {
  CampaignModule,
  GameModule,
  IGameService,
  IVoucherService,
  GameType,
  defaultTree,
  IGame,
  ConfigModule,
  ICampaignService
} from '@perx/core';
import { APP_BASE_HREF } from '@angular/common';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { PopupType } from '../vouchers/vouchers.component';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let router: Router;

  const gameServiceStub = {};
  const campaignServiceStub = {
    getCampaigns: () => of([])
  };

  const fakeGame: IGame = {
    id: 1,
    campaignId: 1,
    type: GameType.shakeTheTree,
    remainingNumberOfTries: 10,
    // name: 'UAT GAME',
    texts: {},
    results: {},
    config: { ...defaultTree(), treeImg: '', giftImg: '' },
  };

  const vouchersServiceMock = jasmine.createSpyObj('IVoucherService', ['']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [
        ConfigModule.forRoot({ ...environment }),
        RouterModule.forRoot([]),
        CampaignModule,
        GameModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: IVoucherService, useValue: vouchersServiceMock },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to false if game is set', () => {
    component.$game = of(fakeGame);
    component.actionOnGameStatus();
    expect(component.loading).toBeFalsy();
  });

  it('should stay in game page if game remaining number of tries greater than 0', () => {
    spyOn(router, 'navigate');
    component.$game = of({ ...fakeGame, remainingNumberOfTries: 0 });
    component.actionOnGameStatus();
    expect(router.navigate).toHaveBeenCalledWith(['/vouchers', { popup: PopupType.completed }]);
  });

  it('should stay in game page if game remaining number of tries greater than 0', () => {
    spyOn(router, 'navigate');
    component.$game = of(fakeGame);
    component.actionOnGameStatus();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  // it('should call router navigate with numRewards more than 0 when r1 status code is 200', () => {
  //   spyOn(router, 'navigate');
  //   spyOn(gameService, 'play').and.returnValue(of({
  //     status: 200,
  //     data: {
  //       outcomes: [{}, {}]
  //     }
  //   }));
  //   component.isWhistler = false;
  //   component.done();
  //   expect(router.navigate).toHaveBeenCalledWith(['/result'], { queryParams: { numRewards: 2 } });
  // });
});
