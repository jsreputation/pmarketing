import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampCampaignHomeComponent } from './stamp-campaign-home.component';

@NgModule({
  declarations: [StampCampaignHomeComponent],
  exports: [StampCampaignHomeComponent],
  imports: [
    CommonModule
  ]
})
export class StampCampaignHomeModule { }
