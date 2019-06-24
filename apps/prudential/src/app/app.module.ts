import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  VouchersModule,
  PerxCoreModule,
  PopupComponent,
  CognitoModule,
  AuthenticationModule,
  OauthModule,
  CampaignModule,
  GameModule
} from '@perx/core/dist/perx-core';
import { GameComponent } from './game/game.component';
import { CongratsComponent } from './congrats/congrats.component';
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

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CongratsComponent,
    ActivationCodeComponent,
    RedemptionComponent,
    TncComponent,
    ContactUsComponent,
    VouchersComponent,
    VoucherComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VouchersModule.forRoot({ env: environment }),
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
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    CampaignModule.forRoot({ env: environment }),
    GameModule.forRoot({ env: environment }),
    AuthenticationModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupComponent
  ]
})
export class AppModule {
}
