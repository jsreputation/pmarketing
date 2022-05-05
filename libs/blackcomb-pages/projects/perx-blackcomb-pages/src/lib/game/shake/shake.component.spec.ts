import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShakeComponent } from './shake.component';
import { GameModule, IGame, IGameService, ITheme, SettingsService, ThemesService } from '@perxtech/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

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
      title: 'HELLO',
      subTitle: 'hello'
    },
    results: {
    }
  };
  const mockTheme: ITheme = {
    name: 'theme',
    properties: {
      '--background': 'red',
      '--font_color': 'black'
    }
  };

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of(mockTheme)
  };
  const gameServiceStub: Partial<IGameService> = {
    get: () => of(),
    getGamesFromCampaign: () => of()
  };
  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShakeComponent],
      imports: [
        GameModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: IGameService, useValue: gameServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub }
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

  it('should display title', () => {
    const title = fixture.debugElement.nativeElement.querySelector('.game-header')
      .firstElementChild;
    expect(title.textContent).toBe(component.game.texts.title);
  });

  it('should display subTitle', () => {
    const subTitle = fixture.debugElement.nativeElement.querySelector('.game-header')
      .children[1];
    expect(subTitle.textContent).toBe(component.game.texts.subTitle);
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
