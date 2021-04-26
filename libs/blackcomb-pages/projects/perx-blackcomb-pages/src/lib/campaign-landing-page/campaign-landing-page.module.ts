import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
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
