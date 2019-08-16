import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DiscoverComponent } from './discover/discover.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule, MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, MatRippleModule } from '@angular/material';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { CategoriesComponent } from './categories/categories.component';
import { RewardsCardsComponent } from './rewards-cards/rewards-cards.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { UtilsModule } from '@perx/core';

@NgModule({
  declarations: [
    DiscoverComponent,
    VouchersComponent,
    HomeComponent,
    NewsFeedComponent,
    CategoriesComponent,
    RewardsCardsComponent,
    CatalogsComponent,
    CampaignsComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    HomeRoutingModule,
    NgxMultiLineEllipsisModule,
    UtilsModule
  ],
  bootstrap: [
  ]
})
export class HomeModule { }
