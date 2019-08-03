import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { GamesComponent } from './games.component';
import { GameModule } from '@perx/core';
import { MatTabsModule, MatFormFieldModule, MatSliderModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShakeComponent, TapComponent, GamesComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    GameModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    FormsModule
  ]
})
export class GamesModule { }
