import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { VouchersModule } from './vouchers/vouchers.module';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './auth/authentication/authentication.module';
import { FeedItemPopupComponent } from './utils/feed-item-popup/feed-item-popup.component';

const modules = [
  VouchersModule,
  PuzzlesModule,
  AuthenticationModule,
  CommonModule,
  MatIconModule,
];

const comps = [FeedItemPopupComponent];

@NgModule({
  imports: [
    ...modules,
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
