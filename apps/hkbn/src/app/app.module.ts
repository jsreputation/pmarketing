import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  APP_INITIALIZER,
  NgModule,
} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import {
  MatButtonModule,
  MatDialogModule,
  MatTabsModule,
} from '@angular/material';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

import {
  AuthenticationModule,
  AuthenticationService,
  LoyaltyModule,
  ProfileModule,
  RewardsModule,
  UtilsModule,
  VouchersModule,
  MerchantsModule,
  ConfigModule,
} from '@perx/core';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ContentContainerModule } from './ui/content-container/content-container.module';
import { HomeModule } from './home/home.module';
import { WalletComponent } from './wallet/wallet.component';
import { VoucherDetailsComponent } from './wallet/voucher-details/voucher-details.component';
import { UnauthorizedInterceptor } from './auth/unauthorized.interceptor';
import { SnackbarModule } from './ui/snackbar/snackbar.module';
import { HistoryComponent } from './history/history.component';

const getAppAccessToken = (authenticationService: AuthenticationService) => () => authenticationService.getAppToken().toPromise();

export const setLanguage = (translateService: TranslateService) => () => new Promise((resolve) => {
  translateService.setDefaultLang(environment.defaultLang);
  resolve();
});

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const PROVIDERS = [
  {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
  {provide: APP_INITIALIZER, useFactory: getAppAccessToken, deps: [AuthenticationService], multi: true},
  {provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService], multi: true},
];

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    VoucherDetailsComponent,
    HistoryComponent
  ],
  imports: [
    ConfigModule.forRoot({...environment}),
    BrowserModule,
    AuthModule,
    AuthenticationModule,
    ProfileModule,
    LoyaltyModule,
    VouchersModule,
    RewardsModule,
    MerchantsModule,
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
    InfiniteScrollModule,
  ],
  providers: [
    ...PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
