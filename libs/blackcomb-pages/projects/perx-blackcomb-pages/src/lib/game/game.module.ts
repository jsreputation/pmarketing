import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {
  AuthenticationModule, CampaignModule,
  CampaignServiceModule,
  GameModule as PerxGameModule,
  GameServiceModule as PerxGameServiceModule, RewardPopupComponent
} from '@perxtech/core';
import { GameComponent } from './game.component';
import { ScratchComponent } from './scratch/scratch.component';
import { ShakeComponent } from './shake/shake.component';
import { SnakeComponent } from './snake/snake.component';
import { SpinComponent } from './spin/spin.component';
import { TapComponent } from './tap/tap.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlinkoComponent } from './plinko/plinko.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TapComponent,
    ShakeComponent,
    ScratchComponent,
    GameComponent,
    SpinComponent,
    SnakeComponent,
    PlinkoComponent,
    RewardPopupComponent
  ],
  exports: [
    GameComponent,
    TapComponent,
    ShakeComponent,
    ScratchComponent,
    SpinComponent,
    SnakeComponent,
    PlinkoComponent
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
    MatDialogModule,
    MatIconModule,
    CampaignModule
  ],
  entryComponents: [RewardPopupComponent]
})
export class GameModule { }
