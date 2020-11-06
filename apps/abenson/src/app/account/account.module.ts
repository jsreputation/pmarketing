import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountModule as BCPAccountModule } from '@perxtech/blackcomb-pages';
import { SettingsModule } from '@perxtech/core';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    BCPAccountModule,
    SettingsModule,
  ],
})
export class AccountModule {}
