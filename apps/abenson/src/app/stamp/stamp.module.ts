import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StampRoutingModule } from './stamp-routing.module';
import { CardComponent } from './card/card.component';
import { PuzzlesModule, StampModule as PerxStampModule } from '@perxtech/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    PuzzlesModule,
    MatButtonModule,
    StampRoutingModule,
    PerxStampModule
  ]
})
export class StampModule { }
