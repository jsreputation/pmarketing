import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RewardsModule, VouchersModule, UtilsModule, ConfigModule } from '@perxtech/core';
import { LayoutComponent } from './layout.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [
    // LayoutRoutingModule must be listed first to use its '' routing paths
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

// WalletModule,
// CommonModule,
// HomeModule,
// ReactiveFormsModule,
// FormsModule,
// VouchersModule,
// RewardsModule,
// GameModule,
// SharedModule,
// TranslateModule,
// MatSelectModule,
// MatCheckboxModule,
// MatRadioModule,
// LocationModule,
// InfiniteScrollModule,
// PerxBlackcombPagesModule,
// GameServiceModule.forRoot(),
// CampaignServiceModule.forRoot()
