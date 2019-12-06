import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ConfigToMappedSlotPipe, ConfigToSlicesPipe, SpinComponent} from './spin.component';
import {SpinTheWheelComponent} from '@perx/core';
import {
  GameType
} from '@perx/core';

const dummyIGame = {
  id: 1,
  type: GameType.spin,
  remainingNumberOfTries: 3,
  config: {
    numberOfWedges: 5,
    rewardSlots: [1, 2, 4],
    colorCtrls: {0: 'black', 1: 'yellow', 2: 'green', 3: 'blue', 4: 'red'},
    rewardIcon: '',
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
        SpinComponent,
        SpinTheWheelComponent,
        ConfigToSlicesPipe,
        ConfigToMappedSlotPipe
      ]
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
