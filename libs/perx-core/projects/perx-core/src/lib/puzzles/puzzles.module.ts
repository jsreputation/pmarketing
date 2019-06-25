import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleDrawComponent } from './puzzle-draw/puzzle-draw.component';
import { PuzzleListComponent } from './puzzle-list/puzzle-list.component';
import { PuzzlePlayComponent } from './puzzle-play/puzzle-play.component';
import { MaterialModule } from '../shared/material.module';
import { PuzzleStampComponent } from './puzzle-stamp/puzzle-stamp.component';

@NgModule({
  declarations: [
    PuzzleDrawComponent,
    PuzzleListComponent,
    PuzzlePlayComponent,
    PuzzleStampComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    PuzzleDrawComponent,
    PuzzleListComponent,
    PuzzlePlayComponent,
    PuzzleStampComponent
  ]
})
export class PuzzlesModule {}
