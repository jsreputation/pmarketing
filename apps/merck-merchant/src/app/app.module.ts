import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSnackBarModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import {
  AuthenticationModule,
  RewardsModule,
  LoyaltyModule,
  VouchersModule,
  MerchantsModule,
  ConfigModule,
  ProfileModule
   } from '@perx/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrscannerComponent } from './qrscanner/qrscanner.component';
import { HeaderComponent } from './header/header.component';
import { SalesContactComponent } from './sales-contact/sales-contact.component';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { OrderComponent } from './order/order.component';
import { OrderQuantityComponent } from './order/order-quantity/order-quantity.component';
import { RedeemComponent } from './redeem/redeem.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ResetPasswordComponent,
    QrscannerComponent,
    HeaderComponent,
    SalesContactComponent,
    CustomSnackbarComponent,
    OrderComponent,
    OrderQuantityComponent,
    RedeemComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    ProfileModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    ZXingScannerModule,
    MatSnackBarModule,
    RewardsModule,
    MerchantsModule,
    LoyaltyModule,
    VouchersModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CustomSnackbarComponent]
})
export class AppModule { }
