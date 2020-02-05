import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpressionsRoutingModule } from './impressions-routing.module';
import { ImpressionsComponent } from './impressions.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [ImpressionsComponent],
  imports: [
    CommonModule,
    ImpressionsRoutingModule,
    UnderConstructionModule
  ]
})
export class ImpressionsModule { }
