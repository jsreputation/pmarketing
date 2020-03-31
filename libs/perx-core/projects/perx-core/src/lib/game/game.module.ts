import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShakeTreeComponent } from './shake-tree/shake-tree.component';
import { PinataComponent } from './pinata/pinata.component';
import { ScratchCardComponent } from './scratch-card/scratch-card.component';
import { SpinTheWheelComponent } from './spin-the-wheel/spin-the-wheel.component';
import { SnakeGameComponent } from './snake/snake.component';
import { MineSweeperComponent } from './mine-sweeper/mine-sweeper.component';

// https://github.com/ng-packagr/ng-packagr/issues/641
// @dynamic
@NgModule({
  declarations: [
    ShakeTreeComponent,
    PinataComponent,
    ScratchCardComponent,
    SpinTheWheelComponent,
    SnakeGameComponent,
    MineSweeperComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [
    ShakeTreeComponent,
    PinataComponent,
    ScratchCardComponent,
    SpinTheWheelComponent,
    SnakeGameComponent,
    MineSweeperComponent
  ]
})
export class GameModule {}

