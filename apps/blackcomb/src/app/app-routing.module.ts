import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
    canActivate: [PublicGuard]
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then((mod) => mod.LoadingModule),
    canActivate: [PublicGuard]
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((mod) => mod.LayoutModule),
    canActivate: [ProtectedGuard]
  },
  { path: '**', redirectTo: '/wallet' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
