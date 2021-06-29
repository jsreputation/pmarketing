import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameModule, GameType, SettingsService, ThemesService} from '@perxtech/core';

import { PlinkoComponent } from './plinko.component';
import { of } from 'rxjs';

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

const themesServiceStub: Partial<ThemesService> = {
  getThemeSetting: () => of()
};

const settingsServiceStub: Partial<SettingsService> = {
  getRemoteFlagsSettings: () => of()
};

describe('PlinkoComponent', () => {
  let component: PlinkoComponent;
  let fixture: ComponentFixture<PlinkoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GameModule],
      declarations: [ PlinkoComponent ],
      providers: [
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub }
      ]
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
