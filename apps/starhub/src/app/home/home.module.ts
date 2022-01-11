import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {
  CampaignModule,
  CampaignServiceModule,
  ConfigModule,
  GameServiceModule as PerxGameServiceModule,
  LoyaltyModule,
  OutcomeModule,
  PopupComponent,
  QuestModule as PerxQuestModule,
  UtilsModule,
  StampModule,
} from '@perxtech/core';

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
import { GhostsModule } from '../ghosts/ghosts.module';
import { StampCardsComponent } from './stamp-cards/stamp-cards.component';
import { QuizSurveyCampaignsComponent } from './quiz-campaigns/quiz-survey-campaigns.component';
import { TaggedItemsComponent } from './tagged-items/tagged-items.component';
import { StarsComponent } from './stars/stars.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { IvyCarouselModule } from 'angular-responsive-carousel';

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
    StampCardsComponent,
    NoRenewaleInNamePipe,
    QuizSurveyCampaignsComponent,
    TaggedItemsComponent,
    StarsComponent,
  ],
  imports: [
    ConfigModule.forChild(),
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatDialogModule,
    HomeRoutingModule,
    UtilsModule,
    ScrollingModule,
    LoyaltyModule,
    InfiniteScrollModule,
    CampaignModule,
    CampaignServiceModule.forChild(),
    PerxGameServiceModule.forChild(),
    StampModule,
    OutcomeModule,
    GhostsModule,
    MatExpansionModule,
    PerxQuestModule.forChild(),
    IvyCarouselModule,
  ],
  bootstrap: [],
  providers: [NoRenewaleInNamePipe],
  entryComponents: [PopupComponent],
})
export class HomeModule {}
