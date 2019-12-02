import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  MatToolbarModule,
  MatTabsModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatDialogModule,
} from '@angular/material';

import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';

import {
  UtilsModule,
  LoyaltyModule,
  ConfigModule,
  VouchersModule as PerxCoreVouchersModule,
  RewardsModule as PerxRewardsModule
} from '@perx/core';

import { environment } from 'src/environments/environment';
import { HomeRoutingModule } from './home-routing.module';
import { DiscoverComponent } from './discover/discover.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { HomeComponent } from './home/home.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { CategoriesComponent } from './categories/categories.component';
import { RewardsCardsComponent } from './rewards-cards/rewards-cards.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NoRenewaleInNamePipe } from './no-renewale-in-name.pipe';
import { PopupComponent } from './news-feed/popup/popup.component';

@NgModule({
  declarations: [
    DiscoverComponent,
    VouchersComponent,
    HomeComponent,
    NewsFeedComponent,
    CategoriesComponent,
    RewardsCardsComponent,
    CatalogsComponent,
    CampaignsComponent,
    NoRenewaleInNamePipe,
    PopupComponent,
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatDialogModule,
    HomeRoutingModule,
    NgxMultiLineEllipsisModule,
    UtilsModule,
    ScrollingModule,
    LoyaltyModule,
    PerxRewardsModule,
    PerxCoreVouchersModule,
  ],
  bootstrap: [
  ],
  providers: [
    NoRenewaleInNamePipe,
  ],
  entryComponents: [
    PopupComponent
  ]
})
export class HomeModule { }
