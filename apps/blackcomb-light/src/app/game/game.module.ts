import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { GameComponent, GameModule as BCGameModule } from '@perxtech/blackcomb-pages';
import { AppRouter } from '../router';

const routes: Routes = [{
  path: '',
  component: GameComponent
}];

@NgModule({
  imports: [
    BCGameModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: Router, useClass: AppRouter }
  ]
})
export class GameModule { }
