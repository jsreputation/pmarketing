import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatButtonModule, MatNativeDateModule, MatSnackBarModule
} from '@angular/material';
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
import { JsonApiModule } from 'angular2-jsonapi';
import { PerxChartModule } from '@perx/chart';
import { WINDOW_PROVIDERS } from '@cl-core/services/window.service';
import { GestureConfig } from '@angular/material/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { setLanguage, TranslateLoaderService } from '@cl-core/translate-services/translate-loader-service';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    MatButtonModule,
    SideNavModule,
    HttpClientModule,
    MatNativeDateModule,
    PerxChartModule.forRoot({ tokenBasePath: environment.apiHost }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    JsonApiModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useClass: TranslateLoaderService
      }
    }),
  ],
  providers: [
    LocalStorageService,
    SessionService,
    WINDOW_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService, TranslateDefaultLanguageService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
