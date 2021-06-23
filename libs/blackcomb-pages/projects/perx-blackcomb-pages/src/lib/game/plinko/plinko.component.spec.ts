import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameModule, GameType} from '@perxtech/core';

import { PlinkoComponent } from './plinko.component';

const dummyIGame = {
  id: 1,
  type: GameType.plinko,
  remainingNumberOfTries: 3,
  config: {
    backgroundImage: '',
    targetImage: '',
    stageColor: '',
    ballColor: ''
  },
  texts: {
  },
  results: {
  },
};

describe('PlinkoComponent', () => {
  let component: PlinkoComponent;
  let fixture: ComponentFixture<PlinkoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GameModule],
      declarations: [ PlinkoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlinkoComponent);
    component = fixture.componentInstance;
    component.game = dummyIGame;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
