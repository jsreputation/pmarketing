import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import {
  AuthenticationModule, AuthenticationService,
  ConfigModule, ConfigService, IConfig, LanguageInterceptor, LanguageService, LocaleIdFactory, LoyaltyModule,
  ProfileModule,
  ProfileServiceModule as PerxProfileServiceModule, ThemesService, TokenStorage
} from '@perxtech/core';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap, tap } from 'rxjs/operators';

export const setLanguage = (
  translateService: TranslateService,
  configService: ConfigService,
  authService: AuthenticationService,
  themesService: ThemesService) =>
  () => new Promise((resolve) => {
    configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => translateService.setDefaultLang(config.defaultLang || 'en')),
      // for currentLang registering to determine lang ver of url navigation on content.component
      tap(() => translateService.use(translateService.getBrowserLang())),
      switchMap(() => authService.getAppToken()),
      switchMap(() => themesService.getThemeSetting()),
    ).toPromise().then(() => resolve());
  });


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    ConfigModule.forRoot({ ...environment }),

    // core modules
    AuthenticationModule,
    LoyaltyModule.forRoot(),
    ProfileModule,
    PerxProfileServiceModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [ HttpClient, HttpBackend, ConfigService, TokenStorage ],
        useClass: LanguageService
      }
    }),
    // angular provided modules
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,

    // Material Modules
    MatProgressSpinnerModule,
    MatSnackBarModule,

    // app modules
    AppRoutingModule
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [ TranslateService, ConfigService, AuthenticationService, ThemesService ], multi: true
    },
    {
      provide: LOCALE_ID,
      deps: [ TokenStorage ],
      useFactory: LocaleIdFactory
    },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
  ],
})
export class AppModule {
}
