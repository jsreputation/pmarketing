import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  ConfigModule,
  RewardsModule,
  UtilsModule,
  VouchersModule
} from '@perxtech/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations:[
    LayoutComponent
  ],
  imports: [
    // LayoutRoutingModule must be listed first to use its '' routing paths
    LayoutRoutingModule,
    CommonModule,
    RouterModule,
    // ReactiveFormsModule,
    // FormsModule,
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
