import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import {
  GameModule,
  IGameService,
  IGame,
} from '@perx/core';

import { of } from 'rxjs';

import { ScratchComponent } from './scratch.component';

describe('ScratchComponent', () => {
  let component: ScratchComponent;
  let fixture: ComponentFixture<ScratchComponent>;
  const mockGame: IGame = {
    id: 1,
    type: 0,
    remainingNumberOfTries: 3,
    config: {
      treeImg: '',
      giftImg: '',
      nbHangedGift: 3,
      nbGiftsToDrop: 3,
      nbTaps: 3,
    },
    texts: {
      title: 'HELLO',
      subTitle: 'hello'
    },
    results: {
    }
  };
  const gameServiceStub: Partial<IGameService> = {
    get: () => of(),
    getGamesFromCampaign: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScratchComponent],
      imports: [GameModule],
      providers: [
        { provide: IGameService, useValue: gameServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchComponent);
    component = fixture.componentInstance;
    component.game = mockGame;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits broken event when game is completed', () => {
    spyOn(component.broken, 'emit');
    component.gameCompleted();
    fixture.detectChanges();
    expect(component.broken.emit).toHaveBeenCalled();
  });
});
