import { NgModule } from '@angular/core';
import {
  CommonModule,
  DatePipe
} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcode6Module } from 'ngx-barcode6';

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
import { ConfigService } from '../config/config.service';
import { SafeHtmlPipe } from '../utils/safe-html.pipe';
import { TranslateModule } from '@ngx-translate/core';
import {
  Platform,
  PlatformModule
} from '@angular/cdk/platform';
import { UrlRedemptionComponent } from './url-redemption/url-redemption.component';

export function vouchersServiceFactory(
  http: HttpClient,
  config: Config,
  configService: ConfigService,
  rewardsService: RewardsService,
  platform: Platform
): IVoucherService {
  if (config.isWhistler) {
    return new WhistlerVouchersService(http, config, rewardsService);
  }
  // Make decision on what to instantiate base on config
  return new V4VouchersService(http, configService, platform);
}

const components = [
  VouchersComponent,
  VoucherComponent,
  BcodeRedemptionComponent,
  PinRedemptionComponent,
  QrcodeRedemptionComponent,
  BarcodeRedemptionComponent,
  UrlRedemptionComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    NgxBarcode6Module,
    ReactiveFormsModule,
    MaterialModule,
    UtilsModule,
    TranslateModule.forChild(),
    PlatformModule
  ],
  exports: [
    ...components
  ],
  providers: [
    DatePipe,
    SafeHtmlPipe,
    {
      provide: IVoucherService,
      useFactory: vouchersServiceFactory,
      deps: [HttpClient, Config, ConfigService, RewardsService, Platform]
    }
  ]
})
export class VouchersModule {
}
