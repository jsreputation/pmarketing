import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressCampaignHomeComponent } from '../progress-campaign-home/progress-campaign-home.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule } from '@perxtech/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [ProgressCampaignHomeComponent],
  exports: [ProgressCampaignHomeComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    UtilsModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatListModule,
  ]
})
export class ProgressCampaignHomeModule { }
