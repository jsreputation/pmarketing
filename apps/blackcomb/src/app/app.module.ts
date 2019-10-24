import { AccountModule } from './account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  VouchersModule,
  AuthenticationModule,
  GameModule,
  UtilsModule,
  ProfileModule,
  ConfigModule,
  RewardsModule,
  MerchantsModule as PerxMerchantsModule,
  CampaignModule as PerxCampaignModule,
  StampModule as PerxStampModule,
} from '@perx/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatRippleModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  HistoryComponent,
  RedeemComponent,
  LoginComponent,
  VoucherDetailComponent,
  RewardDetailsComponent,
  LoadingComponent,
  ContentComponent,
  WalletComponent
} from '@perx/blackcomb-pages';
import { HomeModule } from './home/home.module';

const perxComponents = [
  HistoryComponent,
  RedeemComponent,
  LoginComponent,
  VoucherDetailComponent,
  RewardDetailsComponent,
  LoadingComponent,
  ContentComponent,
  WalletComponent,
];

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export const setLanguage = (translateService: TranslateService) => () => new Promise((resolve) => {
  translateService.setDefaultLang(environment.defaultLang);
  resolve();
});
@NgModule({
  declarations: [
    AppComponent,
    ...perxComponents
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    AuthenticationModule,
    GameModule,
    AccountModule,
    ProfileModule,
    BrowserAnimationsModule,
    RewardsModule,
    PerxMerchantsModule,
    PerxStampModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    UtilsModule,
    PerxCampaignModule,
    HttpClientModule,
    HomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService], multi: true }
  ],
})
export class AppModule { }
