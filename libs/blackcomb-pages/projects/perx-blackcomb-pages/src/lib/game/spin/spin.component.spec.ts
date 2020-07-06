import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import {
  GameModule,
  GameType
} from '@perxtech/core';

import {
  SpinComponent,
} from './spin.component';

const dummyIGame = {
  id: 1,
  type: GameType.spin,
  remainingNumberOfTries: 3,
  config: {
    numberOfWedges: 5,
    rewardSlots: [0],
    slices: [{
      id: 0,
      backgroundColor: 'blue',
      backgroundImage: ''
    }],
    wheelImg: '',
    wheelPosition: '',
    pointerImg: '',
    background: '',
  },
  texts: {
  },
  results: {
  },
};

describe('SpinComponent', () => {
  let component: SpinComponent;
  let fixture: ComponentFixture<SpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpinComponent
      ],
      imports: [
        GameModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinComponent);
    component = fixture.componentInstance;
    component.game = dummyIGame;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
