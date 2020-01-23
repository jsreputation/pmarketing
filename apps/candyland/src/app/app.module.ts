import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, Injectable, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { MainContainerComponent } from './main-container/main-container.component';
import { SideNavModule } from './shared/components/side-nav/side-nav.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '@cl-core/interceptors/auth.interceptor';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { SessionService } from '@cl-core/services/session.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PerxChartModule } from '@perx/chart';
import { WINDOW_PROVIDERS } from '@cl-core/services/window.service';
import { GestureConfig } from '@angular/material/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';
import {
  setLanguage,
  translateLoader
} from '@cl-core/translate-services/multiple-translate-loader-service';
import * as Sentry from '@sentry/browser';
import { HttpServicesModule } from '@perx/whistler-services';

Sentry.init({
  dsn: 'https://18cd39b4f761401d9a8de7d2cd4398ed@sentry.io/1827238'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  public handleError(error: any): void {
    Sentry.captureException(error.originalError || error);
    if (!environment.production) {
      console.error(error);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpServicesModule.forRoot(
      environment.apiHost,
      environment.apiCdn
    ),
    AppRoutingModule,
    AuthModule,
    MatButtonModule,
    SideNavModule,
    MatNativeDateModule,
    PerxChartModule.forRoot({ tokenBasePath: environment.apiHost }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: (httpClient) => translateLoader(httpClient, [
          { prefix: './assets/i18n/', suffix: '.json' },
          { prefix: '/assets/i18n/dashboard/', suffix: '.json' },
          { prefix: '/assets/i18n/merchants/', suffix: '.json' },
          { prefix: '/assets/i18n/rewards/', suffix: '.json' },
          { prefix: '/assets/i18n/engagements/', suffix: '.json' },
          { prefix: '/assets/i18n/campaigns/', suffix: '.json' },
          { prefix: '/assets/i18n/audience/', suffix: '.json' },
          { prefix: '/assets/i18n/settings/', suffix: '.json' },
          { prefix: '/assets/i18n/loyalty/', suffix: '.json' },
          { prefix: '/assets/i18n/campaigns/', suffix: '.json' },
          { prefix: '/assets/i18n/common/', suffix: '.json' }
        ])
      }
    }),
  ],
  providers: [
    LocalStorageService,
    SessionService,
    WINDOW_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService, TranslateDefaultLanguageService], multi: true },
    { provide: ErrorHandler, useClass: SentryErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
