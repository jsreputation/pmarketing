import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TapRoutingModule } from './tap-routing.module';
import { TapComponent } from './tap/tap.component';
import { GameModule } from '@perx/core';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [TapComponent],
  imports: [
    CommonModule,
    GameModule,
    MatButtonModule,
    TapRoutingModule
  ]
})
export class TapModule { }
