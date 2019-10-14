import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TapComponent } from './tap.component';
import { GameModule, IGameService, IGame } from '@perx/core';
import { of } from 'rxjs';

describe('TapComponent', () => {
  let component: TapComponent;
  let fixture: ComponentFixture<TapComponent>;
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
    },
    results: {
    }
  };
  const gameServiceStub = {
    get: () => of(),
    getGamesFromCampaign: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TapComponent],
      imports: [GameModule],
      providers: [
        { provide: IGameService, useValue: gameServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapComponent);
    component = fixture.componentInstance;
    component.game = mockGame;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
