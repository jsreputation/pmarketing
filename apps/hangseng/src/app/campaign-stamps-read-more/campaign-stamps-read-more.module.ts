import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignStampsReadMoreRoutingModule } from './campaign-stamps-read-more-routing.module';
import { CampaignStampsReadMoreComponent } from './campaign-stamps-read-more.component';
import { PipeUtilsModule } from '@perxtech/core';


@NgModule({
  declarations: [CampaignStampsReadMoreComponent],
  imports: [
    CommonModule,
    CampaignStampsReadMoreRoutingModule,
    PipeUtilsModule
  ]
})
export class CampaignStampsReadMoreModule { }
