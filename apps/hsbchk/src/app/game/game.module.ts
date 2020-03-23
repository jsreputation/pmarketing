import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material';

import {
  GameModule as PerxGameModule,
  AuthenticationModule,
} from '@perxtech/core';
import { GameModule as BCGameModule } from '@perxtech/blackcomb-pages';

import { GameRoutingModule } from './game-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    BCGameModule,
    PerxGameModule,
    AuthenticationModule,
    MatProgressBarModule
  ]
})
export class GameModule { }
