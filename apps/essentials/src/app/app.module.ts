import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  AuthInterceptor,
  LocalStorageService,
  SessionService, setLanguage,
  TranslateDefaultLanguageService,
  translateLoader,
  WINDOW_PROVIDERS
} from '@es-core';
import { SidenavModule } from '@perx/candyshop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { MainContainerComponent } from './main-container/main-container.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GestureConfig } from '@angular/material/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
// import * as Sentry from '@sentry/browser';

// Sentry.init({
//   dsn: 'https://18cd39b4f761401d9a8de7d2cd4398ed@sentry.io/1827238'
// });

// @Injectable()
// export class SentryErrorHandler implements ErrorHandler {
//   public handleError(error: any): void {
//     Sentry.captureException(error.originalError || error);
//     if (!environment.production) {
//       console.error(error);
//     }
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    MatSnackBarModule,
    MatButtonModule,
    SidenavModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: (httpClient) => translateLoader(httpClient, [
          {prefix: './assets/i18n/', suffix: '.json'},
          {prefix: '/assets/i18n/common/', suffix: '.json'}
        ])
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    LocalStorageService,
    SessionService,
    WINDOW_PROVIDERS,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [TranslateService, TranslateDefaultLanguageService],
      multi: true
    },
    // {provide: ErrorHandler, useClass: SentryErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
