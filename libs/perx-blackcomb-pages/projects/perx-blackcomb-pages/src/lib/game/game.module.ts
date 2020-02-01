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
  SpinTheWheelComponent,
  SnakeGameComponent,
  RewardPopupComponent, ExpireTimerComponent
} from '@perx/core';

import { TapComponent } from './tap/tap.component';
import { ShakeComponent } from './shake/shake.component';
import { ScratchComponent } from './scratch/scratch.component';
import { GameComponent } from './game.component';
import { SnakeComponent } from './snake/snake.component';
import {
  ConfigToMappedSlotPipe,
  ConfigToSlicesPipe,
  SpinComponent,
} from './spin/spin.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    RewardPopupComponent,
    ExpireTimerComponent,
    TapComponent,
    ShakeComponent,
    ScratchComponent,
    PinataComponent,
    ShakeTreeComponent,
    ScratchCardComponent,
    SpinTheWheelComponent,
    SnakeGameComponent,
    GameComponent,
    SpinComponent,
    ConfigToSlicesPipe,
    ConfigToMappedSlotPipe,
    SnakeComponent
  ],
  exports: [
    TapComponent,
    ShakeComponent,
    ScratchComponent,
    SpinComponent,
    SnakeComponent,
    ConfigToSlicesPipe,
    ConfigToMappedSlotPipe
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class GameModule { }
