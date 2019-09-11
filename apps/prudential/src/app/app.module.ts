import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  VouchersModule,
  PerxCoreModule,
  AuthenticationModule,
  CampaignModule,
  GameModule,
  UtilsModule,
  ConfigModule,
  ProfileModule
} from '@perx/core';
import { GameComponent } from './game/game.component';
import { ActivationCodeComponent } from './activation-code/activation-code.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { TncComponent } from './tnc/tnc.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VouchersComponent } from './vouchers/vouchers.component';
import { VoucherComponent } from './vouchers/voucher/voucher.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ResultComponent,
    ActivationCodeComponent,
    RedemptionComponent,
    TncComponent,
    ContactUsComponent,
    VouchersComponent,
    VoucherComponent,
    LoginComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    VouchersModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    PerxCoreModule,
    ProfileModule,
    CampaignModule,
    GameModule,
    AuthenticationModule,
    FormsModule,
    UtilsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
