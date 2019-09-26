import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampRoutingModule } from './stamp-routing.module';
import { CardComponent } from './card/card.component';
import { PuzzlesModule, StampModule as PerxStampsModule } from '@perx/core';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    PuzzlesModule,
    MatButtonModule,
    StampRoutingModule,
    PerxStampsModule
  ]
})
export class StampModule { }
