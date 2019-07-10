import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VouchersComponent } from './vouchers.component';
import { VoucherComponent } from './voucher/voucher.component';
import { MaterialModule } from '../shared/material.module';
import { VouchersService } from './vouchers.service';
import { BcodeRedemptionComponent } from './bcode-redemption/bcode-redemption.component';
import { PinRedemptionComponent } from './pin-redemption/pin-redemption.component';
import { ReactiveFormsModule } from '@angular/forms';

const components = [
  VouchersComponent,
  VoucherComponent,
  BcodeRedemptionComponent,
  PinRedemptionComponent
];

@NgModule({
  declarations: [
    ...components,
    BcodeRedemptionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ...components
  ]
})
export class VouchersModule {

  constructor(@Optional() @SkipSelf() parentModule: VouchersModule) {
    if (parentModule) {
      throw new Error(
        'VouchersModule is already loaded. Import it in the AppModule only');
    }
  }

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
