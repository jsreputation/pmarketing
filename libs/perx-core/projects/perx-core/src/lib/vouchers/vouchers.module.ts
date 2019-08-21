import { NgModule, ModuleWithProviders } from '@angular/core';
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
  ]
})
export class VouchersModule {
  // todo: restore this block when config service is built
  // constructor(@Optional() @SkipSelf() parentModule: VouchersModule) {
  //   if (parentModule) {
  //     throw new Error(
  //       'VouchersModule is already loaded. Import it in the AppModule only');
  //   }
  // }

  public static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: VouchersModule,
      providers: [
        VouchersService,
        {
          provide: 'config',
          useValue: config
        }
      ],
    };
  }
}
