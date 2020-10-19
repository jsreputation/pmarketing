import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { VouchersModule } from '@perxtech/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, WalletRoutingModule, VouchersModule, SharedModule],
})
export class WalletModule {}
