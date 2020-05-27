import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule, MatIconModule, MatDialogModule } from '@angular/material';
import { ThemesService, ConfigModule, ConfigService, ITheme } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

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
  let location: Location;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of(mockTheme)
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
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

  it('should location back', () => {
    component.backArrowIcon = 'back';
    spyOn(location, 'back');
    component.backArrowClick();
    expect(location.back).toHaveBeenCalled();
  });
});
