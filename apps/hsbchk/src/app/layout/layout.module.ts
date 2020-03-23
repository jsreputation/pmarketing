import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VouchersModule, RewardsModule } from '@perxtech/core';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    // LayoutRoutingModule must be listed first to use its '' routing paths
    LayoutRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VouchersModule,
    RewardsModule,
    SharedModule,
    TranslateModule,
    PerxBlackcombPagesModule
  ]
})
export class LayoutModule { }
