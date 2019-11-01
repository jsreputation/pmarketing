import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule, MatButtonModule } from '@angular/material';

import {
  PinataComponent,
  ShakeTreeComponent,
  ScratchCardComponent,
} from '@perx/core';

import { TapComponent } from './tap/tap.component';
import { ShakeComponent } from './shake/shake.component';
import { ScratchComponent } from './scratch/scratch.component';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [
    TapComponent,
    ShakeComponent,
    ScratchComponent,
    PinataComponent,
    ShakeTreeComponent,
    ScratchCardComponent,
    GameComponent,
  ],
  exports: [
    TapComponent,
    ShakeComponent,
    ScratchComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule
  ]
})
export class GameModule { }
