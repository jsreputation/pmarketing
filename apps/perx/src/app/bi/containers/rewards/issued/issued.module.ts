import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuedRoutingModule } from './issued-routing.module';
import { IssuedComponent } from './issued.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [IssuedComponent],
  imports: [
    CommonModule,
    IssuedRoutingModule,
    UnderConstructionModule
  ]
})
export class IssuedModule { }
