import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleListComponent } from './puzzle-list/puzzle-list.component';
import { PuzzlePlayComponent } from './puzzle-play/puzzle-play.component';
import { MaterialModule } from '../shared/material.module';
import { PuzzleStampComponent } from './puzzle-stamp/puzzle-stamp.component';
import { StampComponent } from './puzzle-stamp/stamp/stamp.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [
    PuzzleListComponent,
    PuzzlePlayComponent,
    PuzzleStampComponent,
    StampComponent
  ],
  imports: [CommonModule, MaterialModule, UtilsModule],
  exports: [
    PuzzleListComponent,
    PuzzlePlayComponent,
    PuzzleStampComponent
  ]
})
export class PuzzlesModule {}
