import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RewardsModule, VouchersModule, UtilsModule, ConfigModule } from '@perxtech/core';
import { LayoutComponent } from './layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [
    // LayoutRoutingModule must be listed first to use its '' routing paths
    LayoutRoutingModule,
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    UtilsModule,
    ConfigModule.forChild(),
    VouchersModule,
    RewardsModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class LayoutModule { }
