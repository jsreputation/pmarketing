import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GamesCollectionComponent } from './games-collection.component';
import { MatCardModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import {
  ConfigService,
  ITheme,
  StripHtmlPipe,
  ThemesService
} from '@perxtech/core';
import { of } from 'rxjs';

describe('GamesCollectionComponent', () => {
  const mockTheme: ITheme = {
    name: 'theme',
    properties: {
      '--background': 'red',
      '--font_color': 'black'
    }
  };

  let component: GamesCollectionComponent;
  let fixture: ComponentFixture<GamesCollectionComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of(mockTheme)
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesCollectionComponent, StripHtmlPipe ],
      imports: [
        MatCardModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: ThemesService,
          useValue: themesServiceStub
        },
        {
          provide: ConfigService,
          useValue: configServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
