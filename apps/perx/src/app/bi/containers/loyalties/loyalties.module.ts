import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyaltiesRoutingModule } from './loyalties-routing.module';
import { LoyaltiesComponent } from './loyalties.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [LoyaltiesComponent],
  imports: [
    CommonModule,
    LoyaltiesRoutingModule,
    UnderConstructionModule
  ]
})
export class LoyaltiesModule { }
