import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameModule, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  {
    path: '',
    component: GameComponent
  }
];

@NgModule({
  declarations: [GameComponent],
  imports: [CommonModule, GameModule, RouterModule.forChild(routes), PerxBlackcombPagesModule]
})
export class SHGameModule { }
