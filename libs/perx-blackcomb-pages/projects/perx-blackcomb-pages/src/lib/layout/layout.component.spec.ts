import { async, TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule, MatIconModule, MatDialogModule } from '@angular/material';
import { ThemesService, AuthenticationService, ConfigModule, ConfigService, ITheme } from '@perxtech/core';
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
  let router: Router;
  let location: Location;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of(mockTheme)
  };
  const authServiceStub: Partial<AuthenticationService> = {
    $failedAuth: of(true)
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' },
          { path: 'login', redirectTo: '/' }
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
          provide: AuthenticationService,
          useValue: authServiceStub
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
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch theme', fakeAsync(() => {
    const routerSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    expect(component.theme).toBe(mockTheme);
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  }));

  it('should location back', () => {
    component.backArrowIcon = 'back';
    spyOn(location, 'back');
    component.backArrowClick();
    expect(location.back).toHaveBeenCalled();
  });
});
