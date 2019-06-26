import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CampaignsRoutingModule} from './campaigns-routing.module';
import {CampaignsListPageComponent} from './containers/campaigns-list-page/campaigns-list-page.component';
import {NewInfoPageComponent} from './containers/new-info-page/new-info-page.component';
import {NewAudiencePageComponent} from './containers/new-audience-page/new-audience-page.component';
import {NewChannelPageComponent} from './containers/new-channel-page/new-channel-page.component';
import {NewReviewPageComponent} from './containers/new-review-page/new-review-page.component';
import {NewCampaignDonePopupComponent} from './containers/new-campaign-done-popup/new-campaign-done-popup.component';
import {CampaignsComponent} from './containers/campaigns/campaigns.component';

@NgModule({
  declarations: [
    CampaignsListPageComponent,
    NewInfoPageComponent,
    NewAudiencePageComponent,
    NewChannelPageComponent,
    NewReviewPageComponent,
    NewCampaignDonePopupComponent,
    CampaignsComponent],
  imports: [
    CommonModule,
    CampaignsRoutingModule
  ],
  entryComponents: [
    NewCampaignDonePopupComponent
  ]
})
export class CampaignsModule {
}
