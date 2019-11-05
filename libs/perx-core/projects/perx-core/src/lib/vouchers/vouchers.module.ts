import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VouchersComponent } from './vouchers/vouchers.component';
import { VoucherComponent } from './voucher/voucher.component';
import { MaterialModule } from '../shared/material.module';
import { IVoucherService } from './ivoucher.service';
import { BcodeRedemptionComponent } from './bcode-redemption/bcode-redemption.component';
import { PinRedemptionComponent } from './pin-redemption/pin-redemption.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QrcodeRedemptionComponent } from './qrcode-redemption/qrcode-redemption.component';
import { QRCodeModule } from 'angularx-qrcode';
import { UtilsModule } from '../utils/utils.module';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { V4VouchersService } from './v4-vouchers.service';
import { WhistlerVouchersService } from './whistler-vouchers.service';
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
