import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrRedemptionRoutingModule } from './qr-redemption-routing.module';
import { QrRedemptionComponent } from './qr-redemption.component'
import { VouchersModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QrRedemptionComponent
  ],
  imports: [
    CommonModule,
    QrRedemptionRoutingModule,
    VouchersModule,
    TranslateModule
  ]
})
export class QrRedemptionModule { }
