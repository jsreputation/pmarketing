import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StampsRoutingModule } from './stamps-routing.module';
import { CardComponent } from './card/card.component';
import { StampsComponent } from './stamps/stamps.component';
import { PuzzlesModule } from '@perx/core';
import { MatSliderModule } from '@angular/material';

@NgModule({
  declarations: [CardComponent, StampsComponent],
  imports: [
    CommonModule,
    StampsRoutingModule,
    MatSliderModule,
    PuzzlesModule
  ]
})
export class StampsModule { }
