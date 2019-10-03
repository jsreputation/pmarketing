import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampsRoutingModule } from './stamps-routing.module';
import { CardComponent } from './card/card.component';
import { StampsComponent } from './stamps/stamps.component';
import { PuzzlesModule } from '@perx/core';
import { MatSliderModule, MatCheckboxModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [CardComponent, StampsComponent],
  imports: [
    CommonModule,
    StampsRoutingModule,
    MatSliderModule,
    MatCheckboxModule,
    MatIconModule,
    PuzzlesModule
  ]
})
export class StampsModule { }
