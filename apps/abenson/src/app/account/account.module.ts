import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountModule as BCPAccountModule } from '@perxtech/blackcomb-pages';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    BCPAccountModule,
  ],
})
export class AccountModule {}
