import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from './campaign.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CampaignService,
  ],
  exports: [
  ]
})
export class CampaignModule { }
