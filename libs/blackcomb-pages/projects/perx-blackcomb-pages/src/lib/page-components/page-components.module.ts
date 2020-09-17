import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsCollectionComponent } from '../home/campaigns-collection/campaigns-collection.component';
import { UtilsModule } from '@perxtech/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CampaignsCollectionComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule.forChild(),
    UtilsModule
  ],
  exports: [
    CampaignsCollectionComponent
  ]
})
export class PageComponentsModule {}
