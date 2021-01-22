import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpClient,
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import {
  APP_INITIALIZER,
  ErrorHandler,
  Injectable,
  NgModule
} from '@angular/core';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatRippleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatListModule
} from '@angular/material';

import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {
  AuthenticationModule,
  AuthenticationService,
  CampaignModule,
  CampaignServiceModule,
  ConfigModule,
  ConfigService,
  FeedItemPopupComponent,
  GameServiceModule as PerxGameServiceModule,
  IConfig,
  LanguageService,
  LocationModule,
  LoyaltyModule,
  MerchantsModule,
  ProfileModule,
  ProfileServiceModule as PerxProfileServiceModule,
  RewardPopupComponent,
  RewardsModule,
  SettingsModule,
  ThemesService,
  TokenStorage,
  UtilsModule,
  VouchersModule,
  PuzzlesModule,
  StampModule
} from '@perxtech/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { RewardComponent } from './reward/reward.component';
import { LocationsComponent } from './locations/locations.component';
import { TncComponent } from './tnc/tnc.component';
import { VoucherComponent } from './voucher/voucher.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { CategorySelectComponent } from './category/category-select/category-select.component';
import { CategorySortComponent } from './category/category-sort/category-sort.component';
import { LocationShortFormatComponent } from './location-short-format/location-short-format.component';
import { RewardDetailComponent } from './reward/reward-detail/reward-detail.component';
import { StampCardComponent } from './stamp/stamp-card.component';
import { CongratsComponent } from './congrats/congrats.component';
import { ExpireTimerComponent } from './reward/expire-timer/expire-timer.component';
import { ErrorComponent } from './error/error.component';

import { environment } from '../environments/environment';
import * as Sentry from '@sentry/browser';
import {
  // switchMap,
  tap
} from 'rxjs/operators';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { GhostsModule } from './ghosts/ghosts.module';
import { Observable } from 'rxjs';

Sentry.init({
  dsn: 'https://b7939e78d33d483685b1c82e9c076384@sentry.io/1873560'
});

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestClone = request.clone({ headers: request.headers.set('app-version', environment.appVersion) });
    return next.handle(requestClone);
  }
}

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

// app token only needed for the settings APIs
export const appInit =
  (
    translateService: TranslateService,
    configService: ConfigService,
    authService: AuthenticationService,
    // themesService: ThemesService
  ) => () => new Promise((resolve) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      authService.saveUserAccessToken(token);
    } else {
      console.error('Could not retrieve user token');
    }

    configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => translateService.setDefaultLang(config.defaultLang || 'en')),
      // switchMap(() => authService.getAppToken()),
      // switchMap(() => themesService.getThemeSetting())
    ).toPromise().then(() => resolve());
    resolve();
  });


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    RewardComponent,
    LocationsComponent,
    TncComponent,
    VoucherComponent,
    RedemptionComponent,
    CategorySelectComponent,
    CategorySortComponent,
    LocationShortFormatComponent,
    RewardDetailComponent,
    StampCardComponent,
    CongratsComponent,
    ExpireTimerComponent,
    ErrorComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    BrowserModule,
    CampaignModule,
    AppRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatSnackBarModule,
    UtilsModule,
    BrowserAnimationsModule,
    ProfileModule,
    HttpClientModule,
    RewardsModule.forRoot(),
    AuthenticationModule,
    ProfileModule,
    PerxProfileServiceModule.forRoot(),
    VouchersModule,
    LocationModule,
    ScrollingModule,
    CampaignModule,
    CampaignServiceModule.forRoot(),
    PerxGameServiceModule.forRoot(),
    PuzzlesModule,
    StampModule,
    MerchantsModule.forRoot(),
    QRCodeModule,
    NgxBarcodeModule,
    InfiniteScrollModule,
    LoyaltyModule.forRoot(),
    GhostsModule,
    MatProgressSpinnerModule,
    MatListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, HttpBackend, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    })
  ],
  entryComponents: [
    CategorySelectComponent,
    CategorySortComponent,
    RewardPopupComponent,
    FeedItemPopupComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    {
      provide: APP_INITIALIZER, useFactory: appInit,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService], multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
