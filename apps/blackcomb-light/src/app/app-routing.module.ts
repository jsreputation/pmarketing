import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'game/:id',
        loadChildren: () => import('./game/game.module').then((mod) => mod.GameModule),
      },
      {
        path: 'stamp/:id',
        loadChildren: () => import('./stamp/stamp.module').then((mod) => mod.StampModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
