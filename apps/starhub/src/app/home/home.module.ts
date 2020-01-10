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

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';

import {
  UtilsModule,
  LoyaltyModule,
  ConfigModule,
  CampaignModule,
  PopupComponent,
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
    NoRenewaleInNamePipe
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
    InfiniteScrollModule,
    CampaignModule
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
