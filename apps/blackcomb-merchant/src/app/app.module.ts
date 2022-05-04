import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { switchMap, tap } from 'rxjs/operators';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  AuthenticationModule,
  AuthenticationService,
  ConfigModule,
  ConfigService,
  IConfig,
  LocaleIdFactory,
  LanguageInterceptor,
  ThemesService,
  TokenStorage,
  SettingsService,
  LanguageService,
  UtilsModule,
  ProfileServiceModule as PerxProfileServiceModule,
  SettingsModule, InstantOutcomeTransactionServiceModule
} from '@perxtech/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpBackend, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

export const appInit =
  (
    translateService: TranslateService,
    configService: ConfigService,
    authService: AuthenticationService,
    themesService: ThemesService
  ) => () => new Promise((resolve) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      authService.saveUserAccessToken(token);
    }

    configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => translateService.setDefaultLang(config.defaultLang || 'en')),
      switchMap(() => authService.getAppToken()),
      switchMap(() => themesService.getThemeSetting())
    ).toPromise().then(() => resolve());
  });
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    BrowserModule,
    MatToolbarModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    UtilsModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    MatIconModule,
    PerxProfileServiceModule.forRoot(),
    InstantOutcomeTransactionServiceModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: LanguageService,
        deps: [HttpClient, HttpBackend, ConfigService, TokenStorage]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService, SettingsService], multi: true
    },
    {
      provide: LOCALE_ID,
      deps: [TokenStorage],
      useFactory: LocaleIdFactory
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
