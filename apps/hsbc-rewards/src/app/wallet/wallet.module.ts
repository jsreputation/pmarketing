import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { SharedModule } from '../shared/shared.module';
import { VouchersModule } from '@perx/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [WalletComponent],
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule,
    VouchersModule.forRoot({env: environment})
  ]
})
export class WalletModule { }
