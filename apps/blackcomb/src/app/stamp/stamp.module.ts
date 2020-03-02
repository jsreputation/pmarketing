import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampRoutingModule } from './stamp-routing.module';
import { PuzzlesModule, StampModule as PerxStampsModule } from '@perx/core';
import { MatButtonModule } from '@angular/material';
import { StampCardComponent, PerxBlackcombPagesModule } from '@perx/blackcomb-pages';

@NgModule({
  imports: [
    CommonModule,
    PuzzlesModule,
    MatButtonModule,
    StampRoutingModule,
    PerxStampsModule,
    PerxBlackcombPagesModule
  ]
})
export class StampModule { }
