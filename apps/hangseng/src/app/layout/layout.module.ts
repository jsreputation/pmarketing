import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  AccountModule,
  CampaignStampsModule,
  FindLocationModule,
  HistoryModule,
  HomeModule,
  SignIn2Module,
  WalletHistoryModule,
  WalletModule,
  ProfileModule,
  RebatesModule,
} from '@perxtech/blackcomb-pages';
import { ConfigModule, UtilsModule } from '@perxtech/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    // LayoutRoutingModule must be listed first to use its '' routing paths
    LayoutRoutingModule,
    HomeModule,
    SignIn2Module,
    HistoryModule,
    AccountModule,
    WalletModule,
    WalletHistoryModule,
    ProfileModule,
    CampaignStampsModule,
    FindLocationModule,
    RebatesModule,

    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    TranslateModule,
    UtilsModule,
    ConfigModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
