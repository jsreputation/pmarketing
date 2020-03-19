import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { GamesComponent } from './games.component';
import { ScratchComponent } from './scratch/scratch.component';
import { SpinComponent } from './spin/spin.component';
import { GameModule } from '@perxtech/core';
import {
  MatTabsModule,
  MatFormFieldModule,
  MatSliderModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SnakeComponent } from './snake/snake.component';
import { SweepComponent } from './sweep/sweep.component';

@NgModule({
  declarations: [ShakeComponent, TapComponent, GamesComponent, ScratchComponent, SpinComponent, SnakeComponent, SweepComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    GameModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    FormsModule,
  ]
})
export class GamesModule { }
