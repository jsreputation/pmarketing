import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  APP_INITIALIZER,
  Injectable,
  ErrorHandler
} from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  AuthenticationModule,
  UtilsModule,
  ConfigModule,
  MerchantsModule as PerxMerchantsModule,
  CampaignModule as PerxCampaignModule,
  StampModule as PerxStampModule,
  CampaignServiceModule as PerxCampaignServiceModule,
  VouchersModule,
  OutcomeModule,
  ProfileModule,
  ProfileServiceModule,
  RewardsModule,
  TokenStorage,
  LanguageService,
  ConfigService,
  AuthenticationService,
  ThemesService,
  IConfig,
  SettingsModule,
  GameModule as PerxGameModule,
  GameServiceModule,
  LoyaltyModule,
} from '@perxtech/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

// import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { tap, switchMap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { SignupModule } from './signup/signup.module';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://813ab4ad94c94d5eb4370961b9e31e81@o225970.ingest.sentry.io/5276501'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  public handleError(error: any): void {
    // const eventId =
    Sentry.captureException(error.originalError || error);
    if (!environment.production) {
      console.error(error);
    }
    // Sentry.showReportDialog({ eventId });
  }
}
export const setLanguage = (
  translateService: TranslateService,
  configService: ConfigService,
  authService: AuthenticationService,
  themesService: ThemesService) =>
  () => new Promise((resolve) => {
    configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => translateService.setDefaultLang(config.defaultLang || 'en')),
      switchMap(() => authService.getAppToken()),
      switchMap(() => themesService.getThemeSetting())
    ).toPromise().then(() => resolve());
  });

@NgModule({
  declarations: [AppComponent],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    GameServiceModule.forRoot(),
    PerxGameModule,
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    OutcomeModule,
    AuthenticationModule,
    SignupModule,
    ProfileModule,
    ProfileServiceModule.forRoot(),
    BrowserAnimationsModule,
    PerxMerchantsModule.forRoot(),
    PerxStampModule,
    ProfileModule,
    UtilsModule,
    PerxCampaignServiceModule.forRoot(),
    PerxCampaignModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    LoyaltyModule.forRoot(),
    RewardsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    }),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService],
      multi: true
    }
  ],
})
export class AppModule { }
