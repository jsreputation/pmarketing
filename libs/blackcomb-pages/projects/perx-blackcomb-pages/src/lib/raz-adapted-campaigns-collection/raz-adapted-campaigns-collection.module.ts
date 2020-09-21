import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { ProgressBarModule } from '@perxtech/core';
import { RazAdaptedCampaignsCollectionComponent } from './raz-adapted-campaigns-collection.component';

@NgModule({
  declarations: [
    RazAdaptedCampaignsCollectionComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ProgressBarModule
  ],
  exports: [
    RazAdaptedCampaignsCollectionComponent
  ]
})
export class RazAdaptedCampaignsCollectionModule { }
