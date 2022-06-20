import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PuzzlesModule } from '@perxtech/core';
import { StampCardComponent } from './stamp-card.component';

@NgModule({
  declarations: [StampCardComponent],
  exports: [StampCardComponent],
  imports: [CommonModule, PuzzlesModule, MatButtonModule, RouterModule],
})
export class StampCardModule {}
