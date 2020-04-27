import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
  {
    path: 'game/:id',
    loadChildren: () => import('./game/game.module').then((mod) => mod.GameModule),
    canActivate: [ProtectedGuard]
  },
  {
    path: 'stamp/:id',
    loadChildren: () => import('./stamp/stamp.module').then((mod) => mod.StampModule),
    canActivate: [ProtectedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
