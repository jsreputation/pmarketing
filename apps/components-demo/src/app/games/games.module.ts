import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { GameModule } from '@perxtech/core';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { ScratchComponent } from './scratch/scratch.component';
import { ShakeComponent } from './shake/shake.component';
import { SnakeComponent } from './snake/snake.component';
import { SpinComponent } from './spin/spin.component';
import { SweepComponent } from './sweep/sweep.component';
import { TapComponent } from './tap/tap.component';


@NgModule({
  declarations: [ShakeComponent, TapComponent, GamesComponent, ScratchComponent, SpinComponent, SnakeComponent, SweepComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    GameModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatButtonToggleModule,
    FormsModule,
  ]
})
export class GamesModule { }
