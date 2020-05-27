import {NgModule} from '@angular/core';
import {GhostCardComponent} from './card-ghost.component';
import {MatCardModule} from '@angular/material';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    GhostCardComponent
  ],
  imports: [
    MatCardModule,
    CommonModule
  ],
  exports: [
    GhostCardComponent
  ]
})
export class GhostsModule {}
