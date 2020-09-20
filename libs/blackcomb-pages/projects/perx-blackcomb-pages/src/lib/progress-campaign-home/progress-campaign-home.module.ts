import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressCampaignHomeComponent } from './progress-campaign-home.component';
import { CampaignServiceModule } from '@perxtech/core';
import { PageComponentsModule } from '../page-components/page-components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProgressCampaignHomeComponent,
  ],
  exports: [ProgressCampaignHomeComponent],
  imports: [
    CommonModule,
    CampaignServiceModule.forChild(),
    TranslateModule,
    PageComponentsModule
  ]
})
export class ProgressCampaignHomeModule { }
