import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [CampaignsComponent],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    UnderConstructionModule
  ]
})
export class CampaignsModule { }
