import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LargeVouchersComponent } from './large-vouchers.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { VouchersModule, RewardsModule, UtilsModule} from '@perxtech/core';
import { MatRippleModule, MatCardModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LargeVouchersComponent],
  exports: [LargeVouchersComponent],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule,
    VouchersModule,
    MatRippleModule,
    MatCardModule,
    RewardsModule.forChild(),
    TranslateModule.forChild(),
    UtilsModule
  ]
})
export class LargeVouchersModule { }
