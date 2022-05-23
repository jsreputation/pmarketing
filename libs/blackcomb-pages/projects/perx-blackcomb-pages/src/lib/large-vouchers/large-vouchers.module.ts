import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LargeVouchersComponent } from './large-vouchers.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { VouchersModule, UtilsModule,RewardsModule, RewardsServiceModule} from '@perxtech/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
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
    RewardsModule,
    RewardsServiceModule.forChild(),
    TranslateModule.forChild(),
    UtilsModule
  ]
})
export class LargeVouchersModule { }
