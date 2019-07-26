import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AuthenticationModule,
  CognitoModule,
  LoyaltyModule,
  OauthModule,
  PopupComponent,
  ProfileModule,
  UtilsModule,
  VouchersModule,
} from '@perx/core/dist/perx-core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatDialogModule, MatTabsModule } from '@angular/material';
import { ContentContainerModule } from './ui/content-container/content-container.module';
import { HomeModule } from './home/home.module';
import { WalletComponent } from './wallet/wallet.component';
import { VoucherDetailsComponent } from './wallet/voucher-details/voucher-details.component';
import { QrRedemptionComponent } from './wallet/qr-redemption/qr-redemption.component';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    VoucherDetailsComponent,
    QrRedemptionComponent,
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
    UtilsModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,
    ContentContainerModule,
    HomeModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupComponent
  ]
})
export class AppModule {
}
