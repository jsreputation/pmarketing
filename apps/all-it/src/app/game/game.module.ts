import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent, GameModule as BCGameModule } from '@perxtech/blackcomb-pages';
import { AuthenticationModule } from '@perxtech/core';

const routes: Routes = [{
  path: '',
  component: GameComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BCGameModule,
    AuthenticationModule,
    MatProgressBarModule,
  ]
})
export class GameModule { }
