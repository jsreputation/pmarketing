import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CampaignsComponent} from './containers/campaigns/campaigns.component';
import {CampaignsListPageComponent} from './containers/campaigns-list-page/campaigns-list-page.component';
// import {NewCampaignDetailPageComponent} from './containers/new-info-page/new-info-page.component';
// import {NewAudiencePageComponent} from './containers/new-audience-page/new-audience-page.component';
// import {NewChannelPageComponent} from './containers/new-channel-page/new-channel-page.component';
// import {NewCampaignReviewPageComponent} from './containers/new-review-page/new-review-page.component';
import { NewCampaignComponent } from './containers/new-campaign/new-campaign.component';
import { ReviewCampaignComponent } from './containers/review-campaign/review-campaign.component';

const routes: Routes = [
  {path: '',
    component: CampaignsComponent,
    children: [
      {
        path: '',
        component: CampaignsListPageComponent
      },
      {
        path: 'new-campaign',
        component: NewCampaignComponent
      },
      {
        path: 'review/:id',
        component: ReviewCampaignComponent
      }
      // {
      //   path: 'new-info',
      //   component: NewCampaignDetailPageComponent
      // },
      // {
      //   path: 'new-audience',
      //   component: NewAudiencePageComponent
      // },
      // {
      //   path: 'new-channel',
      //   component: NewChannelPageComponent
      // },
      // {
      //   path: 'new-review',
      //   component: NewCampaignReviewPageComponent
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
