import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from '@perx/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { DetailAgreementModule } from '../details/detail-agreement/detail-agreement.module';
import { NavigateToolbarModule } from '../navigate-toolbar/navigate-toolbar.module';
import { RedeemModule } from './redeem/redeem.module';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    DetailAgreementModule,
    NavigateToolbarModule,
    RedeemModule,
    ProfileModule
  ]
})
export class AccountModule { }
