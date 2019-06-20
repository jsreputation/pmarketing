import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleDrawComponent } from './puzzle-draw/puzzle-draw.component';
import { PuzzleListComponent } from './puzzle-list/puzzle-list.component';
import { PuzzlePlayComponent } from './puzzle-play/puzzle-play.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    PuzzleDrawComponent,
    PuzzleListComponent,
    PuzzlePlayComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PuzzleDrawComponent,
    PuzzleListComponent,
    PuzzlePlayComponent
  ]
})
export class PuzzlesModule { }
