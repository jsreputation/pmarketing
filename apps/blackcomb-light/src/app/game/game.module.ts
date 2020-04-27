import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent, GameModule as BCGameModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: GameComponent
}];

@NgModule({
  imports: [
    BCGameModule,
    RouterModule.forChild(routes)
  ]
})
export class GameModule { }
