import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModule as PerxGameModule } from '@perx/core';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';

@NgModule({
  declarations: [GameComponent, ShakeComponent, TapComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    PerxGameModule
  ]
})
export class GameModule { }
