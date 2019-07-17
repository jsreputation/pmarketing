import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleListComponent } from './puzzle-list/puzzle-list.component';
import { PuzzlePlayComponent } from './puzzle-play/puzzle-play.component';
import { MaterialModule } from '../shared/material.module';
import { PuzzleStampComponent } from './puzzle-stamp/puzzle-stamp.component';
import { PuzzleCollectStampsComponent } from './puzzle-collect-stamps/puzzle-collect-stamps.component';

@NgModule({
  declarations: [
    PuzzleListComponent,
    PuzzlePlayComponent,
    PuzzleStampComponent,
    PuzzleCollectStampsComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    PuzzleListComponent,
    PuzzlePlayComponent,
    PuzzleStampComponent,
    PuzzleCollectStampsComponent
  ]
})
export class PuzzlesModule {}
