import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatProgressBarModule,
  MatButtonModule,
} from '@angular/material';

import {
  PinataComponent,
  ShakeTreeComponent,
  ScratchCardComponent,
  SpinTheWheelComponent
} from '@perx/core';

import {
  ConfigToMappedSlotPipe,
  ConfigToSlicesPipe,
  SpinComponent,
} from './spin/spin.component';
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
    SpinTheWheelComponent,
    GameComponent,
    SpinComponent,
    ConfigToSlicesPipe,
    ConfigToMappedSlotPipe
  ],
  exports: [
    TapComponent,
    ShakeComponent,
    ScratchComponent,
    SpinComponent,
    ConfigToSlicesPipe,
    ConfigToMappedSlotPipe
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
  ]
})
export class GameModule { }
