import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    UnderConstructionModule
  ]
})
export class RolesModule { }
