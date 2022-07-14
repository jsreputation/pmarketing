import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  GameType,
  ITheme,
  SettingsService,
  ThemesService,
} from '@perxtech/core';

import { SpinComponent } from './spin.component';
import { GameModule } from '../game.module';
import { of } from 'rxjs';

const dummyIGame = {
  id: 1,
  type: GameType.spin,
  remainingNumberOfTries: 3,
  config: {
    numberOfWedges: 5,
    rewardSlots: [0],
    slices: [
      {
        id: 0,
        backgroundColor: 'blue',
        backgroundImage: '',
      },
    ],
    wheelImg: '',
    wheelPosition: '',
    pointerImg: '',
    background: '',
  },
  texts: {},
  results: {},
};

describe('SpinComponent', () => {
  let component: SpinComponent;
  let fixture: ComponentFixture<SpinComponent>;

  const mockTheme: ITheme = {
    name: 'theme',
    properties: {
      '--background': 'red',
      '--font_color': 'black',
    },
  };

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of(mockTheme),
  };
  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinComponent],
      imports: [GameModule],
      providers: [
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
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
