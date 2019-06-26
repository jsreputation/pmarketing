import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CampaignsComponent} from './containers/campaigns/campaigns.component';
import {CampaignsListPageComponent} from './containers/campaigns-list-page/campaigns-list-page.component';
import {NewInfoPageComponent} from './containers/new-info-page/new-info-page.component';
import {NewAudiencePageComponent} from './containers/new-audience-page/new-audience-page.component';
import {NewChannelPageComponent} from './containers/new-channel-page/new-channel-page.component';
import {NewReviewPageComponent} from './containers/new-review-page/new-review-page.component';

const routes: Routes = [
  {path: '',
    component: CampaignsComponent,
    children: [
      {
        path: '',
        component: CampaignsListPageComponent
      },
      {
        path: 'new-info',
        component: NewInfoPageComponent
      },
      {
        path: 'new-audience',
        component: NewAudiencePageComponent
      },
      {
        path: 'new-channel',
        component: NewChannelPageComponent
      },
      {
        path: 'new-review',
        component: NewReviewPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
