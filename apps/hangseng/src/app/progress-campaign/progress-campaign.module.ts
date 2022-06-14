import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { PrizeSetOutcomeModule, ProgressCampaignServiceModule, UtilsModule } from '@perxtech/core';
import { ProgressCampaignComponent } from './progress-campaign.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProgressCampaignComponent },
];

@NgModule({
  declarations: [ProgressCampaignComponent],
  imports: [
    CommonModule,
    TranslateModule,
    UtilsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    PrizeSetOutcomeModule,
    ProgressCampaignServiceModule.forChild(),
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class ProgressCampaignModule {}
