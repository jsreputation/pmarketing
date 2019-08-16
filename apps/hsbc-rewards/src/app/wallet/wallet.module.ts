import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { SharedModule } from '../shared/shared.module';

import { NavigateToolbarModule } from '../navigate-toolbar/navigate-toolbar.module';

@NgModule({
  declarations: [WalletComponent],
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule,
    NavigateToolbarModule
  ]
})
export class WalletModule { }
