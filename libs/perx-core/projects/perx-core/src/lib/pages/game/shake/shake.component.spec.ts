import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShakeComponent } from './shake.component';
import { of } from 'rxjs';
import { IGame  } from '../../../game/game.model';
import { IGameService } from '../../../game/igame.service';
import { GameModule } from '../../../game/game.module';

describe('ShakeComponent', () => {
  let component: ShakeComponent;
  let fixture: ComponentFixture<ShakeComponent>;
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
      declarations: [ShakeComponent],
      imports: [
        GameModule
      ],
      providers: [
        { provide: IGameService, useValue: gameServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeComponent);
    component = fixture.componentInstance;
    component.game = mockGame;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
