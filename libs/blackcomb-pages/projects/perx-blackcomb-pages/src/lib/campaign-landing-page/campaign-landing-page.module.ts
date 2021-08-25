import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CampaignServiceModule, UtilsModule, PrizeSetOutcomeModule } from '@perxtech/core';
import { CampaignLandingPageComponent } from './campaign-landing-page.component';
import { CampaignEnrollPopupComponent } from './campaign-enroll-popup/campaign-enroll-popup.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CampaignLandingPageComponent,
    CampaignEnrollPopupComponent
  ],
  exports: [
    CampaignLandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CampaignServiceModule.forChild(),
    UtilsModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    PrizeSetOutcomeModule,
    TranslateModule.forChild()
  ],
})
export class CampaignLandingPageModule { }
