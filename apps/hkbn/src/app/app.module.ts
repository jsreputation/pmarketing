import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AuthenticationModule,
  AuthenticationService,
  CognitoModule,
  LoyaltyModule,
  OauthModule,
  ProfileModule,
  RewardsModule,
  UtilsModule,
  VouchersModule,
} from '@perx/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatButtonModule, MatDialogModule, MatTabsModule } from '@angular/material';
import { ContentContainerModule } from './ui/content-container/content-container.module';
import { HomeModule } from './home/home.module';
import { WalletComponent } from './wallet/wallet.component';
import { VoucherDetailsComponent } from './wallet/voucher-details/voucher-details.component';
import { QrRedemptionComponent } from './wallet/qr-redemption/qr-redemption.component';
import { CodeRedemptionComponent } from './wallet/code-redemption/code-redemption.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UnauthorizedInterceptor } from './auth/unauthorized.interceptor';
import { SnackbarModule } from './ui/snackbar/snackbar.module';
import { HistoryComponent } from './history/history.component';

const getAppAccessToken = (authenticationService: AuthenticationService) => {
  return () => authenticationService.getAppToken().toPromise();
};

const setLanguage = (translateService: TranslateService) => {
  return () => new Promise((resolve) => {
    translateService.setDefaultLang(environment.defaultLang);
    resolve();
  });
};

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const PROVIDERS = [
  {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
  {provide: APP_INITIALIZER, useFactory: getAppAccessToken, deps: [AuthenticationService], multi: true},
  {provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService], multi: true}
];

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    VoucherDetailsComponent,
    QrRedemptionComponent,
    CodeRedemptionComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AuthenticationModule,
    OauthModule.forRoot({env: environment}),
    CognitoModule.forRoot({env: environment}),
    ProfileModule.forRoot({env: environment}),
    LoyaltyModule.forRoot({env: environment}),
    VouchersModule.forRoot({env: environment}),
    RewardsModule.forRoot({env: environment}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    UtilsModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,
    ContentContainerModule,
    HomeModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    SnackbarModule,
  ],
  providers: [
    ...PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
