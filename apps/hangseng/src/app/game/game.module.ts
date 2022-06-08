import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import {
  GameModule as PerxGameModule
} from '@perxtech/core';
import { GameModule as BCGameModule } from '@perxtech/blackcomb-pages';
import { GameComponent } from './game.component';

import { ScratchComponent } from './scratch/scratch.component';


const routes: Routes = [{
  path: '',
  component: GameComponent
}];

@NgModule({
  declarations: [GameComponent, ScratchComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    BCGameModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PerxGameModule,
    SharedModule,
    MatListModule
  ]
})
export class GameModule { }
