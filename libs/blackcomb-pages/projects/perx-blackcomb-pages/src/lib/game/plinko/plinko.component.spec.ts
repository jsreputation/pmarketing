import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameModule, GameType, SettingsService, ThemesService} from '@perxtech/core';

import { PlinkoComponent } from './plinko.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

const dummyIGame = {
  id: 1,
  type: GameType.plinko,
  remainingNumberOfTries: 3,
  config: {
    backgroundImage: '',
    targetImage: '',
    stageColor: '',
    ballColor: '',
    gameDuration: 3
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

  it('By default game should be disabled', () => {
    expect(component.isEnabled).toBe(false);
  });

  it('game should be enabled when button is pressed', () => {
    const gameButton = fixture.debugElement.query(By.css('button')).nativeElement;
    gameButton.click();
    fixture.detectChanges();
    expect(component.isEnabled).toBe(true);
  });

  it('emits broken event when game is completed', () => {
    spyOn(component.broken, 'emit');
    component.gameCompleted();
    fixture.detectChanges();
    expect(component.broken.emit).toHaveBeenCalled();
  });
});
