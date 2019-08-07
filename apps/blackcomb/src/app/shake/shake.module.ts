import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShakeRoutingModule } from './shake-routing.module';
import { ShakeComponent } from './shake/shake.component';
import { GameModule } from '@perx/core';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    ShakeComponent
  ],
  imports: [
    CommonModule,
    GameModule,
    MatButtonModule,
    ShakeRoutingModule
  ]
})
export class ShakeModule { }
