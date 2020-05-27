import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CampaignServiceModule, UtilsModule } from '@perxtech/core';
import { CampaignLandingPageComponent } from './campaign-landing-page.component';

@NgModule({
  declarations: [
    CampaignLandingPageComponent
  ],
  exports: [
    CampaignLandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CampaignServiceModule.forChild(),
    UtilsModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class CampaignLandingPageModule { }
