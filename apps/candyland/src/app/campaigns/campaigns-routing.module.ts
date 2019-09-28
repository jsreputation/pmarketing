import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignsComponent } from './containers/campaigns/campaigns.component';
import { CampaignsListPageComponent } from './containers/campaigns-list-page/campaigns-list-page.component';
import { NewCampaignComponent } from './containers/new-campaign/new-campaign.component';
import { ReviewCampaignComponent } from './containers/review-campaign/review-campaign.component';

const routes: Routes = [
  {
    path: '',
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
