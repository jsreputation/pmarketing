import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {
  AuthenticationModule,
  CampaignServiceModule,
  GameModule as PerxGameModule,
  GameServiceModule as PerxGameServiceModule
} from '@perxtech/core';
import { GameComponent } from './game.component';
import { ScratchComponent } from './scratch/scratch.component';
import { ShakeComponent } from './shake/shake.component';
import { SnakeComponent } from './snake/snake.component';
import { ConfigToSlicesPipe, SpinComponent } from './spin/spin.component';
import { TapComponent } from './tap/tap.component';
import { MatProgressBarModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    TapComponent,
    ShakeComponent,
    ScratchComponent,
    GameComponent,
    SpinComponent,
    ConfigToSlicesPipe,
    SnakeComponent
  ],
  exports: [
    GameComponent,
    TapComponent,
    ShakeComponent,
    ScratchComponent,
    SpinComponent,
    SnakeComponent,
    ConfigToSlicesPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthenticationModule,
    PerxGameServiceModule.forChild(),
    CampaignServiceModule.forChild(),
    PerxGameModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class GameModule { }
