import { async, TestBed, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ApplicationInitStatus, APP_INITIALIZER } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { setLanguage } from './app.module';
import { ConfigService, AuthenticationService, ThemesService } from '@perxtech/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

const translateServiceStub: Partial<TranslateService> = {
  defaultLang: null,
  setDefaultLang(leng: string): void { this.defaultLang = leng; }
};

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of({
    apiHost: '',
    production: false,
    preAuth: false,
    isWhistler: false,
    baseHref: '',
    defaultLang: 'zh'
  })
};

const authenticationServiceStub = {
  getAppToken: () => of()
};

const themesServiceStub = {
  getThemeSetting: () => of()
};


describe('AppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: translateServiceStub },
        {
          provide: ConfigService,
          useValue: configServiceStub,
        },
        {
          provide: ThemesService,
          useValue: themesServiceStub,
        },
        {
          provide: AuthenticationService,
          useValue: authenticationServiceStub,
        },
        AppComponent,
        {
          provide: APP_INITIALIZER, useFactory: setLanguage,
          deps: [TranslateService, ConfigService, AuthenticationService, ThemesService], multi: true
        }
      ],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: 'login', redirectTo: '/' }
        ])
      ]
    });
  }));
  beforeEach(async () => {
    await TestBed.get(ApplicationInitStatus).donePromise;
  });
  it('should be initialed', inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should set default laguage', inject([TranslateService], (translateService: TranslateService) => {
    expect(translateService.defaultLang).toBe('zh');
  }));
});
