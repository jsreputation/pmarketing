import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ThemesService,
  ConfigModule,
  ConfigService,
  ITheme,
  SettingsService,
  LoyaltyService,
} from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('LayoutComponent', () => {
  const mockTheme: ITheme = {
    name: 'theme',
    properties: {
      '--background': 'red',
      '--font_color': 'black'
    }
  };

  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of(mockTheme)
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  const activatedRouteStub: Partial<ActivatedRoute> = {
    data: of(),
    queryParams: of({ params: { flags: 'chromeless' } })
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalty: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        TranslateModule.forRoot(),
        ConfigModule.forRoot({})
      ],
      declarations: [
        LayoutComponent
      ],
      providers: [
        {
          provide: ThemesService,
          useValue: themesServiceStub
        },
        {
          provide: ConfigService,
          useValue: configServiceStub
        },
        {
          provide: SettingsService,
          useValue: settingsServiceStub
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        Title
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
