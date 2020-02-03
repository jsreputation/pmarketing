import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleBuildingRoutingModule } from './rule-building-routing.module';
import { RuleBuildingComponent } from './rule-building.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [RuleBuildingComponent],
  imports: [
    CommonModule,
    RuleBuildingRoutingModule,
    UnderConstructionModule
  ]
})
export class RuleBuildingModule { }
