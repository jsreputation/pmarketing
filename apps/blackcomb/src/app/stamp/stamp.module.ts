import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampRoutingModule } from './stamp-routing.module';
import { PuzzlesModule, StampModule as PerxStampsModule } from '@perx/core';
import { MatButtonModule } from '@angular/material';
import { StampCardComponent } from '@perx/blackcomb-pages';

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
