import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    UnderConstructionModule
  ]
})
export class ListModule { }
