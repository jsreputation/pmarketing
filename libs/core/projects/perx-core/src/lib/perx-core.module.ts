import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { VouchersModule } from './vouchers/vouchers.module';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './auth/authentication/authentication.module';
import { MerchantAdminModule } from './merchant-admin/merchant-admin.module';
import { UtilsModule } from './utils/utils.module';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
// import { FeedItemPopupComponent } from './utils/feed-item-popup/feed-item-popup.component';

const modules = [
  VouchersModule,
  PuzzlesModule,
  AuthenticationModule,
  MerchantAdminModule,
  CommonModule,
  MatIconModule,
  UtilsModule,
  ScrollingModule
];

const comps = [
  // FeedItemPopupComponent,
];

@NgModule({
  imports: [
    ...modules,
    TranslateModule.forChild()
  ],
  exports: [
    ...modules,
    ...comps,
  ],
  declarations: [
    ...comps,
  ]
})
export class PerxCoreModule {}
