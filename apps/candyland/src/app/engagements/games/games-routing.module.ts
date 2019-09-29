import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewShakePageComponent } from './containers/new-shake-page/new-shake-page.component';
import { NewPinataPageComponent } from './containers/new-pinata-page/new-pinata-page.component';
import { GameComponent } from './containers/game/game.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'new-shake'
  },
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: 'new-shake',
        component: NewShakePageComponent
      },
      {
        path: 'new-shake/:id',
        component: NewShakePageComponent
      },
      {
        path: 'new-pinata',
        component: NewPinataPageComponent
      },
      {
        path: 'new-pinata/:id',
        component: NewPinataPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule {
}
