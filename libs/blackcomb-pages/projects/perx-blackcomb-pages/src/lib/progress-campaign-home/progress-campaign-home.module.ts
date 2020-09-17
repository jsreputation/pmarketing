import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressCampaignHomeComponent } from './progress-campaign-home.component';
import { CampaignServiceModule } from '@perxtech/core';
import { PageComponentsModule } from '../page-components/page-components.module';

@NgModule({
  declarations: [
    ProgressCampaignHomeComponent,
  ],
  exports: [ProgressCampaignHomeComponent],
  imports: [
    CommonModule,
    CampaignServiceModule.forChild(),
    PageComponentsModule
  ]
})
export class ProgressCampaignHomeModule { }
