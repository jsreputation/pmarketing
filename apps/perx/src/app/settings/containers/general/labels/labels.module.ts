import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelsRoutingModule } from './labels-routing.module';
import { LabelsComponent } from './labels.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [LabelsComponent],
  imports: [
    CommonModule,
    LabelsRoutingModule,
    UnderConstructionModule
  ]
})
export class LabelsModule { }
