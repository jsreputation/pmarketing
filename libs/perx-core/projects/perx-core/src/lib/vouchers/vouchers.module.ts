import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';

import { VouchersComponent } from './vouchers/vouchers.component';
import { VoucherComponent } from './voucher/voucher.component';
import { BcodeRedemptionComponent } from './bcode-redemption/bcode-redemption.component';
import { PinRedemptionComponent } from './pin-redemption/pin-redemption.component';
import { QrcodeRedemptionComponent } from './qrcode-redemption/qrcode-redemption.component';
import { BarcodeRedemptionComponent } from './barcode-redemption/barcode-redemption.component';
import { IVoucherService } from './ivoucher.service';
import { V4VouchersService } from './v4-vouchers.service';
import { WhistlerVouchersService } from './whistler-vouchers.service';

import { MaterialModule } from '../shared/material.module';
import { UtilsModule } from '../utils/utils.module';
import { Config } from '../config/config';
import { RewardsService } from '../rewards/rewards.service';

export function vouchersServiceFactory(
  http: HttpClient,
  config: Config,
  rewardsService: RewardsService,
): IVoucherService {
  if (config.isWhistler) {
    return new WhistlerVouchersService(http, config, rewardsService);
  }
  // Make decision on what to instantiate base on config
  return new V4VouchersService(http, config);
}

const components = [
  VouchersComponent,
  VoucherComponent,
  BcodeRedemptionComponent,
  PinRedemptionComponent,
  QrcodeRedemptionComponent,
  BarcodeRedemptionComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    NgxBarcodeModule,
    ReactiveFormsModule,
    MaterialModule,
    UtilsModule
  ],
  exports: [
    ...components
  ],
  providers: [
    DatePipe,
    {
      provide: IVoucherService,
      useFactory: vouchersServiceFactory,
      deps: [HttpClient, Config, RewardsService]
    }
  ]
})
export class VouchersModule {
}
