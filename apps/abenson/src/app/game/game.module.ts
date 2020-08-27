import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModule as PerxGameModule } from '@perxtech/core';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { ScratchComponent } from './scratch/scratch.component';
import { SpinComponent } from './spin/spin.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [GameComponent, ShakeComponent, TapComponent, SpinComponent, ScratchComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    PerxGameModule,
    MatButtonModule
  ]
})
export class GameModule { }
