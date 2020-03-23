import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule, MatButtonModule, MatDialogModule } from '@angular/material';
import {
  LoyaltyModule,
  RewardsModule,
  UtilsModule,
  RewardPopupComponent,
  CampaignModule,
  OutcomeModule,
  ICampaignService
} from '@perxtech/core';
import {
  HomeComponent,
  GamesCollectionComponent,
  CampaignsCollectionComponent,
  CatalogsComponent,
  PerxBlackcombPagesModule
} from '@perxtech/blackcomb-pages';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { campaigns } from '../mock/quiz.mock';
import { map } from 'rxjs/operators';
const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

const campaignServiceStub: Partial<ICampaignService> = {
  getCampaigns: ({ type }) => of([...campaigns])
    .pipe(map(cs => cs.filter(c => c.type === type)))
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    LoyaltyModule,
    UtilsModule,
    RewardsModule,
    MatCardModule,
    MatButtonModule,
    PerxBlackcombPagesModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    MatDialogModule,
    CampaignModule,
    OutcomeModule
  ],
  exports: [
    HomeComponent,
    GamesCollectionComponent,
    CampaignsCollectionComponent,
    CatalogsComponent
  ],
  entryComponents: [
    RewardPopupComponent
  ],
  providers: [
    { provide: ICampaignService, useValue: campaignServiceStub }
  ]
})
export class HomeModule { }
