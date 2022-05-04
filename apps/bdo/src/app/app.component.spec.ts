import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { APP_BASE_HREF } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthenticationService, ConfigService, ThemesService, TokenStorage } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { EventEmitter } from "@angular/core";
import { LangChangeEvent } from '@ngx-translate/core/lib/translate.service';
import { SharedModule } from './shared/shared.module';

const authServiceStub: Partial<AuthenticationService> = {};
const themesServiceStub: Partial<ThemesService> = { getThemeSetting: () => of() };
const tokenStorageStub: Partial<TokenStorage> = {
  getAppInfoProperty: () => undefined,
  setAppInfoProperty: () => { }
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppRoutingModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        SharedModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        },
        {
          provide: AuthenticationService,
          useValue: authServiceStub
        },
        {
          provide: TranslateService,
          useValue: {
            getTranslation: () => of(),
            onLangChange: new EventEmitter<LangChangeEvent>()
          }
        },
        {
          provide: ConfigService,
          useValue: {
            readAppConfig: () => of()
          }
        },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: TokenStorage, useValue: tokenStorageStub },

      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bdo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('bdo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to bdo!'
    );
  });
});
