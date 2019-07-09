import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { RouterModule, Router } from '@angular/router';
import {
  CampaignModule,
  ShakeTreeComponent,
  GameModule,
  GameService,
  VouchersService,
  GAME_TYPE,
  defaultTree
} from '@perx/core/dist/perx-core';
import { APP_BASE_HREF } from '@angular/common';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../../environments/environment';
import { of, Observable } from 'rxjs';
import { POPUP_TYPE } from '../vouchers/vouchers.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let router: Router;
  let gameService: GameService;

  const fakeGame = {
    id: 1,
    campaignId: 1,
    type: GAME_TYPE.shakeTheTree,
    remainingNumberOfTries: 10,
    name: 'UAT GAME',
    config: { ...defaultTree(), treeImg: '', giftImg: '' },
  };

  const vouchersServiceMock = jasmine.createSpyObj('VouchersService', ['']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, ShakeTreeComponent],
      imports: [
        RouterModule.forRoot([]),
        CampaignModule.forRoot({ env: environment }),
        GameModule.forRoot({ env: environment }),
        MatProgressBarModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: VouchersService, useValue: vouchersServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    gameService = TestBed.get(GameService);
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
    expect(router.navigate).toHaveBeenCalledWith(['/vouchers', { popup: POPUP_TYPE.completed }]);
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
