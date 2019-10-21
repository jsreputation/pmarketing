import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModule as PerxGameModule, AuthenticationModule } from '@perx/core';
import { GameRoutingModule } from './game-routing.module';
import { MatProgressBarModule } from '@angular/material';
import { GameComponent, ShakeComponent, TapComponent } from '@perx/blackcomb-pages';

@NgModule({
  declarations: [
    GameComponent,
    ShakeComponent,
    TapComponent
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
