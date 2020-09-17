import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampCampaignHomeComponent } from './stamp-campaign-home.component';
import { CampaignServiceModule } from '@perxtech/core';
import { PageComponentsModule } from '../page-components/page-components.module';

@NgModule({
  declarations: [
    StampCampaignHomeComponent,
  ],
  exports: [StampCampaignHomeComponent],
  imports: [
    CommonModule,
    CampaignServiceModule.forChild(),
    PageComponentsModule
  ]
})
export class StampCampaignHomeModule { }
