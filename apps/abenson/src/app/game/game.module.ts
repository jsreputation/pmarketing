import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModule as PerxGameModule } from '@perxtech/core';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { SpinComponent } from './spin/spin.component';

@NgModule({
  declarations: [GameComponent, ShakeComponent, TapComponent, SpinComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    PerxGameModule
  ]
})
export class GameModule { }
