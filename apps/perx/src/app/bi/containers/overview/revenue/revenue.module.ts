import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenueRoutingModule } from './revenue-routing.module';
import { RevenueComponent } from './revenue.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [RevenueComponent],
  imports: [
    CommonModule,
    RevenueRoutingModule,
    UnderConstructionModule
  ]
})
export class RevenueModule { }
