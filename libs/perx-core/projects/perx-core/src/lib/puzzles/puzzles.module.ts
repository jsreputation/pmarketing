import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleListComponent } from './puzzle-list/puzzle-list.component';
import { PuzzlePlayComponent } from './puzzle-play/puzzle-play.component';
import { MaterialModule } from '../shared/material.module';
import { PuzzleStampComponent } from './puzzle-stamp/puzzle-stamp.component';
import { DebounceClickDirective } from '../utils/debounce-click.directive';

@NgModule({
  declarations: [
    PuzzleListComponent,
    PuzzlePlayComponent,
    PuzzleStampComponent,
    DebounceClickDirective
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    PuzzleListComponent,
    PuzzlePlayComponent,
    PuzzleStampComponent
  ]
})
export class PuzzlesModule {}
