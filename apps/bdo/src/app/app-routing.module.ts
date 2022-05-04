import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicGuard } from 'ngx-auth';
import { ProtectedGuard } from '@perxtech/core';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule),
    canActivate: [ProtectedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
    canActivate: [PublicGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./sign-up/sign-up.module').then((mod) => mod.SignUpModule),
    canActivate: [PublicGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then((mod) => mod.ForgotPasswordModule),
    canActivate: [PublicGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
