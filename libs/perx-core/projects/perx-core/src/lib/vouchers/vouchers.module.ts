import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VouchersComponent } from './vouchers.component';
import { VoucherComponent } from './voucher/voucher.component';
import { MaterialModule } from '../shared/material.module';
import { VouchersService } from './vouchers.service';
import { RedemptionService } from './redemption/redemption.service';
import { BcodeRedemptionComponent } from './bcode-redemption/bcode-redemption.component';

const components = [
  VouchersComponent,
  VoucherComponent,
  BcodeRedemptionComponent
];

@NgModule({
  declarations: [
    ...components,
    BcodeRedemptionComponent
  ],
  imports: [
    CommonModule,
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
        RedemptionService,
        {
          provide: 'config',
          useValue: config
        }
      ],
    };
  }
}
