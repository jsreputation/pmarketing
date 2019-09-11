import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VouchersComponent } from './vouchers/vouchers.component';
import { VoucherComponent } from './voucher/voucher.component';
import { MaterialModule } from '../shared/material.module';
import { VouchersService } from './vouchers.service';
import { BcodeRedemptionComponent } from './bcode-redemption/bcode-redemption.component';
import { PinRedemptionComponent } from './pin-redemption/pin-redemption.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QrcodeRedemptionComponent } from './qrcode-redemption/qrcode-redemption.component';
import { QRCodeModule } from 'angularx-qrcode';
import { UtilsModule } from '../utils/utils.module';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';

export function vouchersServiceFactory(http: HttpClient, config: Config): VouchersService {
  // Make decision on what to instantiate base on config
  return new VouchersService(http, config);
}

const components = [
  VouchersComponent,
  VoucherComponent,
  BcodeRedemptionComponent,
  PinRedemptionComponent,
  QrcodeRedemptionComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    ReactiveFormsModule,
    MaterialModule,
    UtilsModule
  ],
  exports: [
    ...components
  ],
  providers: [
    {
      provide: VouchersService,
      useFactory: vouchersServiceFactory,
      deps: [HttpClient, Config]
    }
  ]
})
export class VouchersModule {
}
