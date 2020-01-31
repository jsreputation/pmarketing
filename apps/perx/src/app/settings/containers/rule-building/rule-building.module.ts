import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleBuildingRoutingModule } from './rule-building-routing.module';
import { RuleBuildingComponent } from './rule-building.component';


@NgModule({
  declarations: [RuleBuildingComponent],
  imports: [
    CommonModule,
    RuleBuildingRoutingModule
  ]
})
export class RuleBuildingModule { }
