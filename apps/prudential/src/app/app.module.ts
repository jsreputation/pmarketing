import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VouchersModule, PerxCoreModule } from '@perx/core/dist/perx-core';
import { GameComponent } from './game/game.component';
import { CongratsComponent } from './congrats/congrats.component';
import { ActivationCodeComponent } from './activation-code/activation-code.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { TncComponent } from './tnc/tnc.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VouchersComponent } from './vouchers/vouchers.component';
import { VoucherComponent } from './vouchers/voucher/voucher.component';

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
    VoucherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VouchersModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    PerxCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
