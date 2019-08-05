import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StampsRoutingModule } from './stamps-routing.module';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    StampsRoutingModule
  ]
})
export class StampsModule { }
