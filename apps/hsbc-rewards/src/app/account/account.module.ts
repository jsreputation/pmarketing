import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
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
    SharedModule,
    DetailAgreementModule,
    NavigateToolbarModule,
    RedeemModule
  ]
})
export class AccountModule { }
