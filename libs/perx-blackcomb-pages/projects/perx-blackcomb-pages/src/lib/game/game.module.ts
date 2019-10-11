import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TapComponent } from './tap/tap.component';
import { ShakeComponent } from './shake/shake.component';
import { PinataComponent, ShakeTreeComponent } from '@perx/core';
import { GameComponent } from './game.component';
import { MatProgressBarModule } from '@angular/material';
@NgModule({
  declarations: [TapComponent, ShakeComponent, PinataComponent, ShakeTreeComponent, GameComponent],
  exports: [TapComponent, ShakeComponent],
  imports: [
    CommonModule,
    MatProgressBarModule
  ]
})
export class GameModule { }
