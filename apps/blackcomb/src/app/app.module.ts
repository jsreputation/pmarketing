import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  VouchersModule,
  CognitoModule,
  OauthModule,
  GameModule,
  UtilsModule
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
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GamePlayComponent } from './instant-reward/game-play/game-play.component';
import { RedeemComponent } from './redeem/redeem.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { AccountComponent } from './account/account.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GamePlayComponent,
    RedeemComponent,
    LoadingComponent,
    VoucherDetailComponent,
    AccountComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule.forRoot({ env: environment }),
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    GameModule.forRoot({ env: environment }),
    BrowserAnimationsModule,
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
    UtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
