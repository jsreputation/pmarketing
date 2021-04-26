import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RazAdaptedCampaignCardComponent } from './raz-adapted-campaign-card.component';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    RazAdaptedCampaignCardComponent
  ],
  exports: [
    RazAdaptedCampaignCardComponent
  ],
  imports: [
    CommonModule,
    ProgressBarModule,
    CommonModule,
    MatCardModule,
  ]
})
export class RazAdaptedCampaignCardModule { }
