import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { QuestModule as BCPQuestModule, UtilsModule } from '@perxtech/core';
import { ProgressCampaignComponent } from './progress-campaign.component';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OutcomesFromLevelPipe } from './outcomes-from-level.pipe';

@NgModule({
  declarations: [ProgressCampaignComponent, OutcomesFromLevelPipe ],
  exports: [ProgressCampaignComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    UtilsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatListModule,
    BCPQuestModule.forChild()
  ],
  providers: []
})
export class ProgressCampaignModule { }
