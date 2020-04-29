import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { PuzzlesModule, StampModule as PerxStampsModule } from '@perxtech/core';
import { StampCardComponent } from './stamp-card.component';

@NgModule({
  declarations: [StampCardComponent],
  exports: [StampCardComponent],
  imports: [
    CommonModule,
    PuzzlesModule,
    MatButtonModule,
    PerxStampsModule,
    RouterModule
  ]
})
export class StampCardModule { }
