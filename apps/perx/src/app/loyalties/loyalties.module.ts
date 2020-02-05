import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyaltiesRoutingModule } from './loyalties-routing.module';
import { LoyaltiesComponent } from './loyalties.component';


@NgModule({
  declarations: [LoyaltiesComponent],
  imports: [
    CommonModule,
    LoyaltiesRoutingModule
  ]
})
export class LoyaltiesModule { }
