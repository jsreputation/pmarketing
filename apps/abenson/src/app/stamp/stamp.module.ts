import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StampRoutingModule } from './stamp-routing.module';
import { CardComponent } from './card/card.component';
import { PuzzlesModule, StampService } from '@perx/core';
import { MatButtonModule } from '@angular/material';
import { stampCard } from './../mock/stamp.mock';
import { of } from 'rxjs';

const stampServiceStub = {
  // @ts-ignore
  getCurrentCard: (id: number) => of(stampCard)
};
@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    PuzzlesModule,
    MatButtonModule,
    StampRoutingModule
  ],
  providers: [
    { provide: StampService, useValue: stampServiceStub }
  ]
})
export class StampModule { }
