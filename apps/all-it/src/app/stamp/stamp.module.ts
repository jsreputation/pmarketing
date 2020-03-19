import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampRoutingModule } from './stamp-routing.module';
import { PuzzlesModule, StampModule as PerxStampsModule } from '@perxtech/core';
import { MatButtonModule } from '@angular/material';
import { StampCardComponent } from '@perxtech/blackcomb-pages';

@NgModule({
  declarations: [StampCardComponent],
  imports: [
    CommonModule,
    PuzzlesModule,
    MatButtonModule,
    StampRoutingModule,
    PerxStampsModule
  ]
})
export class StampModule { }
