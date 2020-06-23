import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { PreLoginGuard } from './pre-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((mod) => mod.LayoutModule),
    canActivate: [PreLoginGuard, ProtectedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./identifier-auth/identifier-auth.module').then((mod) => mod.IdentifierAuthModule)
  },
  { path: '**', redirectTo: '/login', canActivate: [PublicGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
