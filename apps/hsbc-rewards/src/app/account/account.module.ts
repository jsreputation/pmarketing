import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from '@perx/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { NavigateToolbarModule } from '../navigate-toolbar/navigate-toolbar.module';
import { FaqModule } from './faq/faq.module';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NavigateToolbarModule,
    FaqModule,
    ProfileModule,
    MatListModule,
    MatRippleModule
  ]
})
export class AccountModule { }
