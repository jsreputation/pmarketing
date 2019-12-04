import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule ,
} from '@angular/router';

import { NewShakePageComponent } from './containers/new-shake-page/new-shake-page.component';
import { NewPinataPageComponent } from './containers/new-pinata-page/new-pinata-page.component';
import { NewScratchPageComponent } from './containers/new-scratch-page/new-scratch-page.component';
import { GameComponent } from './containers/game/game.component';
import {NewSpinPageComponent} from './containers/new-spin-page/new-spin-page.component';

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
      },
      {
        path: 'new-scratch',
        component: NewScratchPageComponent
      },
      {
        path: 'new-scratch/:id',
        component: NewScratchPageComponent
      },
      {
        path: 'new-spin',
        component: NewSpinPageComponent
      },
      {
        path: 'new-spin/:id',
        component: NewSpinPageComponent
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
