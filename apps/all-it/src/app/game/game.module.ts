import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material';

import {
  GameModule as PerxGameModule,
  AuthenticationModule,
} from '@perx/core';
import {
  GameComponent,
  ShakeComponent,
  TapComponent,
  ScratchComponent,
} from '@perx/blackcomb-pages';

import { GameRoutingModule } from './game-routing.module';

@NgModule({
  declarations: [
    GameComponent,
    ShakeComponent,
    TapComponent,
    ScratchComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    PerxGameModule,
    AuthenticationModule,
    MatProgressBarModule,
  ]
})
export class GameModule { }
