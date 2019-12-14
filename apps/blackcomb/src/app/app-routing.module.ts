import { PreAuthGuard } from './pre-auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
    canActivate: [PublicGuard, PreAuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./sign-up/sign-up.module').then((mod) => mod.SignUpModule),
    canActivate: [PublicGuard, PreAuthGuard]
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then((mod) => mod.LoadingModule)
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((mod) => mod.LayoutModule),
    canActivate: [ProtectedGuard]
  },
  { path: '**', redirectTo: '/wallet', canActivate: [ProtectedGuard] },
  { path: '**', redirectTo: '/loading', canActivate: [PublicGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
